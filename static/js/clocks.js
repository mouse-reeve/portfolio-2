var seconds = 24 * 60 * 60;

var toBase = function (input, radix, noDelimiter) {
    var numbers = input.split(':');
    for (var i=0; i<numbers.length; i++) {
        numbers[i] = (+numbers[i]).toString(radix);
        if (numbers[i].length < 2) {
            numbers[i] = '0' + numbers[i];
        }
    }
    return noDelimiter ? numbers.join('') : numbers.join(':');
};

var toNegativeBase = function (input, radix, noDelimiter) {
    radix = -radix;
    var numbers = input.split(':');

    for (var i=0; i<numbers.length; i++) {
        var number = numbers[i];
        var result = 0;

        while (number != 0) {
            var exp = number > 0 ? 0 : 1;
            var sum = 0;
            while (Math.abs(sum) < Math.abs(number)) {
                sum += (-radix-1) * Math.pow(radix, exp);
                exp += 2;
            }
            exp -= 2;
            var digit = Math.floor(number/Math.pow(radix, exp));
            digit = digit ? digit : 1;

            number -= digit * Math.pow(radix, exp);
            result += digit * Math.pow(10, exp);
        }
        numbers[i] = result + '';
        numbers[i] = numbers[i].length < 2 ? '0' + numbers[i] : numbers[i];
    }
    return noDelimiter ? numbers.join('') : numbers.join(':');
};

var toRoman = function (input) {
    var buckets = [[50, 'L'], [10, 'X'], [5, 'V'], [1, 'I']];
    var numbers = input.split(':');

    for (var i=0; i<numbers.length; i++) {
        var number = +numbers[i];
        var roman = '';
        if (number === 0) {
            numbers[i] = 'nulla';
        } else {
            for (var j=0; j<buckets.length; j++) {
                var value = buckets[j][0];
                var letter = buckets[j][1];
                if (number >= value) {
                    roman += Array(Math.floor(number/value)+1).join(letter);
                    number -= value * (Math.floor(number/value));
                }
                if (!number) {
                    break;
                }

                if (number == value - 1) {
                    roman += 'I' + letter;
                    number -= (value - 1);
                }
            }
            numbers[i] = roman;
        }
    }
    return numbers.join(':');
};

var clocks = [
    {
        clock: function(now) {
            hour = now.getHours();
            hour = hour > 12 ? hour - 12 : hour;
            return hour + ':' + now.getMinutes() + ':' + now.getSeconds();
        }, name: 'twelve'
    },
    {
        clock: function(now) {
            return now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        }, name: 'twentyfour'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return time.split('').reverse().join('');
        }, name: 'reverse'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            time = toBase(time, 16);
            return time.split('').reverse().join('');
        }, name: 'hexreverse'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            time = toBase(time, 16);
            time = time.split('').reverse().join('');
            var color = '#' + time.replace(/:/g, '');
            document.getElementById('hexcolorreverse').style.backgroundColor = color;
            return time;
        }, name: 'hexcolorreverse'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            time = toBase(time, 16);
            var color = '#' + time.replace(/:/g, '');
            document.getElementById('hexcolor').style.backgroundColor = color;
            return time;
        }, name: 'hexcolor'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toBase(time, 16);
        }, name: 'hex'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toBase(time, 3);
        }, name: 'ternary'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toBase(time, 2);
        }, name: 'binary'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toNegativeBase(time, 2);
        }, name: 'negabinary'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toNegativeBase(time, 3);
        }, name: 'negaternary'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toNegativeBase(time, 10);
        }, name: 'negadecimal'
    },
    {
        clock: function(now) {
            var hour = now.getHours();
            hour = hour > 12 ? hour - 12 : hour;
            if (hour == 1) {
                return 'come back at 2';
            }
            var time = hour + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toBase(time, hour);
        }, name: 'basehour'
    },
    {
        clock: function(now) {
            var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            return toRoman(time);
        }, name: 'roman'
    },
    {
        clock: function(now) {
            var times = [now.getHours(), now.getMinutes(), now.getSeconds()];
            var elapsed = (parseInt(times[0]) * 60 * 60) + (parseInt(times[1]) * 60) + parseInt(times[2]);
            return Math.round(elapsed / seconds * 100 * 1000) / 1000 + '%';
        }, name: 'elapsed'
    },
    {
        clock: function(now) {
            var times = [now.getHours(), now.getMinutes(), now.getSeconds()];
            var left = seconds - ((parseInt(times[0]) * 60 * 60) + (parseInt(times[1]) * 60) + parseInt(times[2]));
            return Math.round(left / seconds * 100 * 1000) / 1000 + '%';
        }, name: 'remaining'
    },
    {
        clock: function(now) {
            var times = [now.getHours(), now.getMinutes(), now.getSeconds()];
            var movie = 194 * 60;
            var elapsed = (parseInt(times[0]) * 60 * 60) + (parseInt(times[1]) * 60) + parseInt(times[2]);
            return Math.round(elapsed / movie * 1000) / 1000 + ' times';
        }, name: 'titanic'
    },
];

var update_clocks = function () {
    var now = new Date();
    for (var i = 0; i < clocks.length; i++) {
        var current = document.getElementById(clocks[i].name);
        if (current) {
            var time = clocks[i].clock(now);
            current.innerHTML = time;
        }
    }
};

update_clocks();

window.setInterval(function(){
    update_clocks();
}, 1000);
