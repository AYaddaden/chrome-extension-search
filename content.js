
chrome.runtime.onMessage.addListener(search);
var marks = [];


function search(request, sender, sendResponse) {

    let body_text=document.getElementsByTagName("body")[0].innerText;
    var regex=new RegExp(request.data,"g");
    
    body_html=document.getElementsByTagName("body")[0];
    body_html.normalize();
    if(marks.length>0){
      for (var i = 0; i < marks.length; i++) {
        var mark = marks[i];
        mark.parentNode.replaceChild(mark.firstChild, mark);
      }
      marks = []
    }
    
    recurse(body_html, regex);

    res=body_text.match(regex);
    
   if(res!=null && res!=undefined)
   {
      sendResponse({data:res.length, success: true});
   }
   else{
    sendResponse({data:'0', success: true});
   }
   
};


function recurse(element, regexp) {
  if (element.nodeName == "MARK" || element.nodeName == "SCRIPT" ||
      element.nodeName == "NOSCRIPT" ||
      element.nodeName == "STYLE" ||
      element.nodeType == Node.COMMENT_NODE) {
      return;
  }

  
  if (element.nodeType != Node.TEXT_NODE) {
      var disp = $(element).css('display');
      if (disp == 'none' || disp == 'hidden') {
          return;
      }
  }

  if (element.childNodes.length > 0) {
      for (var i = 0; i < element.childNodes.length; i++) {
          recurse(element.childNodes[i], regexp);
      }
  }

  if (element.nodeType == Node.TEXT_NODE && element.nodeValue.trim() !== '') {
      var str = element.nodeValue;
      var matches = str.match(regexp);
      var parent = element.parentNode;

      if (matches !== null) {
          var pos = 0;
          var mark;
          for (var i = 0; i < matches.length; i++) {
              var index = str.indexOf(matches[i], pos);
              var before = document.createTextNode(str.substring(pos, index));
              pos = index + matches[i].length;

              if (element.parentNode == parent) {
                  parent.replaceChild(before, element);
              } else {
                  parent.insertBefore(before, mark.nextSibling);
              }

              mark = document.createElement('mark');
              mark.appendChild(document.createTextNode(matches[i]));

              parent.insertBefore(mark, before.nextSibling);
              marks.push(mark);
          }
          var after = document.createTextNode(str.substring(pos));
          parent.insertBefore(after, mark.nextSibling);
      }
  }
}
