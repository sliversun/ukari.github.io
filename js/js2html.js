function divtag(name, content, listener, arg)
{
  var listener_str;
  if (arg == undefined) {
    arg = "";
  }
  if (listener != undefined) {
    listener_str = " onclick=" + listener + '("' + arg + '")';
  }
  if (listener_str == undefined) {
    listener_str = "";
  }
  return "<div name=" + name + listener_str +">" + content + "</div>";
}

function atag(url, content, download)
{
  var str;
  if (download != undefined) {
    str = "<a href=" + url + " download=" +download+ ">" + content + "</a>";
  } else {
    str = "<a href=" + url + ">" + content + "</a>";
  }
  return str;
}

function newline()
{
  return "<br>";
}
