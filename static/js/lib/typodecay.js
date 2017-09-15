var map = {
    'a': ['s', 'q', 'z'],
    'b': ['v', 'n', 'g', 'h'],
    'c': ['v', 'x', 'd', 'f'],
    'd': ['s', 'e', 'r', 'f', 'x', 'c', 'v'],
    'p': ['o', '-', ',', '[', ';', 'l'],
    'e': ['w', 'd', 'r'],
    'f': ['d', 'r', 't', 'g', 'v', 'c'],
    'g': ['f', 't', 'y', 'h', 'b', 'v'],
    'h': ['g', 'y', 'u', 'j', 'n', 'b'],
    'i': ['o', 'k', 'j', 'u'],
    'j': ['m', 'n', 'h', 'u', 'i', 'k'],
    'k': ['l', ',', 'm', 'j', 'i', 'o'],
    'l': [';', '.', ',', 'k', 'o', 'p'],
    'm': ['n', 'j', 'k', ','],
    'n': ['b', 'h', 'j', 'm'],
    'o': ['i', 'p', 'l', 'k'],
    'q': ['a', 's', 'w'],
    'r': ['e', 'd', 'f', 't'],
    's': ['a', 'w', 'e', 'd', 'x', 'z'],
    't': ['g', 'f', 'r', 'y'],
    'u': ['j', 'i', 'y'],
    'v': ['c', 'f', 'g', 'b'],
    'w': ['s', 'a', 'q', 'e'],
    'x': ['z', 's', 'd', 'c'],
    'y': ['h', 'g', 't', 'u'],
    'z': ['z', 's', 'd', 'c'],
    '.': [',', '/', ';', '>'],
    ',': ['m', 'k', 'l', '.', '<'],
    '/': ['?', '.', ';', '\''],
    '?': ['/', '.', ';', '\''],
    ';': [':', 'l'],
    ':': [';', 'l'],
    '-': ['=', '_', 'p'],
    '_': ['-', 'p'],
    '=': ['+', '-'],
};

var decay = function () {
    $.each($('.typodecay'), function(_, node) {
        text_nodes = recursive_decay(node);

        //each word in any text node has a chance of decay
        $.each(text_nodes, function (_, text) {
            var word_array = $(text).text().split(' ');
            $.each(word_array, function (index, word) {
                if (Math.random() > 0.9) {
                    word_array[index] = typo(word);
                }
            });
            text.replaceWith(word_array.join(' '));
        });

    });
};

var typo = function (word) {
    if (!word) {
        return word;
    }
    var letters = word.split('');
    var index = Math.floor(Math.random() * (letters.length - 1));
    var replacement = map[letters[index].toLowerCase()];
    if (!replacement) {
        return word;
    }
    replacement = replacement[Math.floor(Math.random() * (replacement.length - 1))];

    if (letters[index].toUpperCase() == letters[index]) {
        replacement = replacement.toUpperCase();
    }

    letters[index] = replacement;
    return letters.join('');
};

var recursive_decay = function (node) {
    var text_nodes = [];
    $.each($(node).contents(), function (_, child) {
        if (child instanceof Text) {
            var text = $(child).text();
            if (text.trim() !== '') {
                text_nodes.push(child);
            }
        }
        else {
            text_nodes = text_nodes.concat(recursive_decay(child));
        }
    });

    return text_nodes;
};

window.setInterval(decay, 500);
