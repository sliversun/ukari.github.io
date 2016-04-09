function base_callback(processfn, data, target)
{
  var result = JSON.parse(data);
  console.log(data+" --> "+result);
  if (processfn == undefined) {
    return;
  }

  if (target != undefined){
    target.innerHTML = "";
    if (result["error"] != "nil") {
      target.innerHTML = result["error"];
      processfn(result, target);
    } else if (result["array"] != undefined && result["array"].length != 0) {
      for (var i in result["array"]) {
        processfn(result, target, i);
      }
    } else if (result["array"] != undefined && result["array"].length == 0) {
      processfn(result, target);
    } else {
      processfn(result, target);
    }
  } else {
    processfn(result);
  }
}

function base_request(method, url, data, processfn, target)
{
  var forsend;
  var dsturl;
  if (method.toUpperCase() == "GET") {
    forsend = "data="+JSON.stringify(data);
    if (data != undefined) {
      dsturl = url+"?"+forsend;
    } else {
      dsturl = url;
    }
  }else if (method.toUpperCase() == "POST") {
    forsend = JSON.stringify(data);
    dsturl = url;
  }else if (method.toUpperCase() == "PUT") {
    forsend = JSON.stringify(data);
    dsturl = url;
  }else if (method.toUpperCase() == "DELETE") {
    forsend = JSON.stringify(data);
    dsturl = url;
  }else{
    forsend = JSON.stringify(data);
    dsturl = url;
    console.log("XMLHttpRequest open method error");
    return;
  }
  var xhttp=new XMLHttpRequest();
  xhttp.open(method, dsturl, true);
  console.log("dst: "+dsturl);
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
