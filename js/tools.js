// use to combine json
function extend(des, src, override)
{
        var copy = JSON.parse(JSON.stringify(des));

        if (src instanceof Array) {
                for (var i in src) {
                        extend(copy, src[i], override);
                }
        }
        for (var j in src) {
                if (override || !(j in copy)) {
                        copy[j] = src[j];
                }
        }
        return copy;
}

function getUTCTime(time)
{
        return (new Date(time).toLocaleString());
}

function random_arg()
{
  return {"avoidpending":Math.random().toString()};
}

function host_url()
{
  return "http://"+window.location.host;
}
