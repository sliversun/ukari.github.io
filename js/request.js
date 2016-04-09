function base_request(method, url, data, processfn, target)
{
        var forsend;
        if (method.toUpperCase() == "GET") {
                forsend = "data="+JSON.stringify(data);
                url = url+"?"+forsend;
        }else if (method.toUpperCase() == "POST") {
                forsend = JSON.stringify(data);
        }else if (method.toUpperCase() == "PUT") {
                forsend = JSON.stringify(data);
        }else if (method.toUpperCase() == "DELETE") {
                forsend = JSON.stringify(data);
        }else{
                forsend = JSON.stringify(data);
                console.log("XMLHttpRequest open method error");
                return;
        }
        var xhttp=new XMLHttpRequest();
        xhttp.open(method, url, true);
        xhttp.onreadystatechange=function ()
        {
                if (xhttp.readyState == 4) {
                        if ((xhttp.status >= 200 && xhttp.status < 300) || xhttp.status == 304) {
                                var data = xhttp.responseText;
                                console.log("received: \n\t"+data);
                                base_callback(processfn, data, target);
                        } else {
                                if (target != null){
                                        target.innerHTML = "";
                                }
                                console.log("can't connect to server");
                        }
                }
        };
        xhttp.send(forsend);
        console.log("send:\n\t"+forsend);
}
