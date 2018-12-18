var comingdate = new Date("Jan 1, 2019 00:00:00");

var d = $('#d');
var h = $('#h');
var m = $('#m');
var s = $('#s');

var x = setInterval(function(){
    var now = new Date();
    var des = comingdate.getTime() - now.getTime();
    var days = Math.floor(des/(1000 * 60 * 60 * 24));
    var hours = Math.floor(des%(1000 * 60 * 60 * 24) / (1000 * 60 *60));
    var mins = Math.floor(des%(1000 * 60 * 60) / (1000 * 60));
    var secs = Math.floor(des%(1000 * 60) / 1000);

    d.text(getTrueNumber(days));
    h.text(getTrueNumber(hours));
    m.text(getTrueNumber(mins));
    s.text(getTrueNumber(secs));

    if(des <= 0) clearInterval(x);

},1000);

function getTrueNumber(x) {
    if (x<10) return '0'+x;
    else return x;
}
