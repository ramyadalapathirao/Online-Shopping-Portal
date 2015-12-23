// Ajax client helper library, uses GET protocol
// Code by Alan Riggins, CS545, Fall 2013


function HttpRequest(sURL, fpCallback) {
    this.request = this.createXmlHttpRequest();
    this.request.open("GET", sURL, true);
    
    var tempRequest = this.request;
   
    function requestReadyStateChange() {
        if(tempRequest.readyState == 4) {
            if(tempRequest.status == 200) {
                fpCallback(tempRequest.responseText);              
                }
            else {
                alert("An error occurred while trying to communicate with the server"
                + " ready state: " + tempRequest.readyState +
                  " status: " + tempRequest.status);
                }
            }
        }
        
    this.request.onreadystatechange = requestReadyStateChange;
    
    }
    
HttpRequest.prototype.createXmlHttpRequest = function() {
    if(window.XMLHttpRequest) {
        var oHttp = new XMLHttpRequest();
        return oHttp;
        }
    else if(window.ActiveXObject) {
        var version = ("MSXML2.XmlHttp.6.0",
                       "MSXML2.XmlHttp.3.0",
                       "MSXML2.XmLHttp",
                       "Microsoft.XMLHTTP");
        for(var i=0; i < version.length; i++) {
            try {
                var oHttp = new ActiveXObject(version[i]);
                return oHttp;
                }
            catch(err) {} // do nothing here
            }
        }
    return null;        
    }
    
HttpRequest.prototype.send = function() {
    this.request.send(null);
    }    

    