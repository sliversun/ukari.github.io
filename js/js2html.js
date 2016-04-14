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

function newline()
{
  return "<br>";
}
