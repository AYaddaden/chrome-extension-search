let mot = "";
var dom=document.getElementById("button");
var checkbox = document.getElementById("activ")

init();



function recherche(){
    seekPhrase = document.getElementById("regExp").value;
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data:seekPhrase}, function(response) {
            chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
            chrome.browserAction.setBadgeText({text:response.data.toString(),tabId:tabs[0].id});
        });
    });

}


function init(){
    
    if(checkbox.checked){
        dom.disabled = false;
        dom.addEventListener("click",recherche);
        chrome.browserAction.setIcon({path: "images/icon_16.png"});

    }else{
        dom.disabled = true;
        chrome.browserAction.setIcon({path: "images/disable_icon_16.png"});
        chrome.browserAction.setBadgeText({text:''});

        
    }

    checkbox.addEventListener( 'click', function() {
        
        if(this.checked) {
            // Checkbox is checked..
            dom.disabled = false;
            chrome.browserAction.setIcon({path: "images/icon_16.png"});
            dom.addEventListener("click",recherche);
            
        } else {
           // Checkbox is not checked..
            dom.disabled = true;
            chrome.browserAction.setIcon({path: "images/disable_icon_16.png"});
            chrome.browserAction.setBadgeText({text:''});
            
        }
        
    });
        
}
