var hide_other_containers = regist_container_hide_controller(["article_lists", "article_container"]);
base_request("GET", "http://"+window.location.host+"/config.json", undefined, load_config, document.getElementById("notification"));
function load_config(data, target)
{
  var list = Object.keys(data);
  for (var i in list) {
    var v = list[i];
    Cookies.set(v, data[v]);
    target.innerHTML += "load config: "+v+" = "+data[v]+newline();
  }
}
