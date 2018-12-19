var comingdate = new Date("Jan 1, 2019 00:00:00");

AOS.init({
    duration: 1200,
})

/*----------------------Time-----------------------------*/
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
//=====================================================================
//-----------------------------convert------------------------------------


$(function(){
    var $convert = $('.convert');
    var $letter = $('.convert__letter');
    var $hat = $('.convert__hat');


    $letter.on("mouseover", function(){
        //alert("enter");
    });

    $('.convert__front').on("click", function(){
        $('.convert__hat').addClass("convert__hat__closed");
    });
});
