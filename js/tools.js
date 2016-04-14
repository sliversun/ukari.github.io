// use to combine json
function extend(des, src, override)
{
        var copy = JSON.parse(JSON.stringify(des));

        if (src instanceof Array) {
                for (var i in src) {
                        extend(copy, src[i], override);
                }
        }
        for (var i in src) {
                if (override || !(i in copy)) {
                        copy[i] = src[i];
                }
        }
        return copy;
}

function getUTCTime(time)
{
        return ((new Date("2016-04-13T19:55:29Z").toLocaleString());
}
