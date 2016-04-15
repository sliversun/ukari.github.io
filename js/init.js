var hide_other_containers = regist_container_hide_controller(["article_lists", "article_container"]);
var hide_other_containers_by_id = function (id) {hide_other_containers(document.getElementById(id));};
wrap_request("GET", host_url() + "/config.json", undefined, sequence_init, document.getElementById("notification"));

function host_url()
{
  return "http://"+window.location.host;
}

function sequence_init(data, target)
{
  load_config(data, target);
  check_oauth();
  change_title();
}

function load_config(data, target)
{
  var list = Object.keys(data);
  for (var i in list) {
    var v = list[i];
    Cookies.set(v, data[v]);
    target.innerHTML += "load config: "+v+" = "+data[v]+newline();
  }
}

function check_oauth()
{
  var access_token = Cookies.get("access_token");
  if (access_token != undefined) {
    var oauth = document.getElementById("oauth");
    base_request("GET", "https://api.github.com/user", {access_token: access_token}, show_loginname, oauth);
  }

  function show_loginname(data, target)
  {
    target.innerHTML = data["login"] + "|已登录";
  }
}


function regist_container_hide_controller(list)
{
  var containers = new Array();
  for (var i = 0; i < list.length; i += 1) {
    containers[i] = document.getElementById(list[i]);
  }
  return function (target)
  {
    for (var i = 0; i < containers.length; i += 1) {
      if (target != containers[i]) {
        containers[i].hidden = true;
      } else {
        containers[i].hidden = false;
      }
    }
  };
}

function change_title()
{
  var title = document.getElementById("title");
  personal_title = Cookies.get("github_username") +"'s " + title.innerHTML;
  title.innerHTML = personal_title;
}
