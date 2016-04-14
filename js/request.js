function base_callback(processfn, data, target)
{
  var result = JSON.parse(data);
  //console.log(data+" --> "+result);
  if (processfn == undefined) {
    return;
  }

  if (target != undefined){
    target.innerHTML = "";
    processfn(result, target);
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
        if (target != undefined){
          target.innerHTML = "";
        }
        console.log("can't connect to server");
      }
    }
  };
  xhttp.send(forsend);
  console.log("send:\n\t"+forsend);
}

function wrap_request(method, url, data, processfn, target)
{
  var wrap_data;
  if (data == undefined) {
    wrap_data = random_arg();
  } else {
    wrap_data = extend(data, random_arg());
  }
  base_request(method, url, wrap_data, processfn, target);
}
