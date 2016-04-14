base_request("GET", gists_url(), undefined, get_articles, document.getElementById("article_lists"));

function get_articles(data, target)
{
  hide_other_containers(target);
  var file = data[0];
  var articles = new Array();
  for (var i = 0; i < data.length; i += 1) {
    if (articlep(data[i])) {
      articles[articles.length] = new Article(data[i]);
    }
  }
  show_articles(articles, target);
  function show_articles(articles, target)
  {
    for (var i = 0; i < articles.length; i += 1){
      var article = articles[i];
      var buf = divtag("article",
                       divtag("title", article.title) +
                       divtag("description", article.description),
                       "click_lists",
                       article.id);
      target.innerHTML += buf;
    }
  }
}

function click_lists(gist_hash)
{
  base_request("GET", gist_url(gist_hash), undefined, get_article, document.getElementById("article_container"));
}

function get_article(data, target)
{
  hide_other_containers(target);
  var article = new Article(data);
  show_article(article, target);
  function show_article(article, target)
  {
    var buf = "";
    buf += divtag("article",
                  divtag("title", article.title) +
                  divtag("create_time", article.create_time) +
                  divtag("update_time", article.update_time) +
                  divtag("content", article.content));
    target.innerHTML = buf;
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
    for (var i = 0; i < containers.length && target != containers[i]; i += 1) {
      containers[i].hidden = true;
    }
  };
}
