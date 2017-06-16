var birth = new Date("Thu Feb 8 1990 03:00:00 GMT-0800 (PST)");
var death = new Date("Mon Jun 22 2082 13:00:00 GMT-0700 (PDT)");

var life_elapsed = function() {
     var now = Date.now();
     var elapsed = (now - birth) / (death - birth) * 100;
     elapsed = Math.round(elapsed * 10000000) / 10000000;
     document.getElementById('life').innerHTML = elapsed + '%';
};
life_elapsed();

window.setInterval(function(){
    life_elapsed();
}, 1000);
