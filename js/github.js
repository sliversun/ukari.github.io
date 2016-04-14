function gists_url()
{
  var github_username = Cookies.get("github_username");
  var gists_url = "https://api.github.com/users/"+github_username+"/gists";
  return gists_url;
}

function gist_url(gist_hash)
{
  var gist_url = "https://api.github.com/gists/" + gist_hash;
  return gist_url;
}

function Article(file)
{
  //only fetch the first file
  var gist = file["files"][Object.keys(file["files"])[0]];
  this.title = gist["filename"];
  this.raw_url = gist["raw_url"];
  var des = file["description"];
  this.content = gist["content"];
  this.description = des.substring(des.indexOf(" ") + 1, des.length);
  this.id = file["id"];
  this.create_time = file["created_at"];
  this.update_time = file["updated_at"];
}

function articlep(file)
{
  var description = file["description"];
  var shebang = description.substring(0, description.indexOf(" "));
  return shebang == "#!unmj";
}
