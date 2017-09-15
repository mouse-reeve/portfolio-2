// replacement

var replace = function (node, word) {
    var replace_id = $(node).attr('data-replace-id')
    var replaceable = $('#' + replace_id);
    if ($(node).attr('data-replaced')) {
        $(replaceable).html($(replaceable).attr('data-original'));
        $(node).attr('data-replaced', '');
    } else {
        $(replaceable).attr('data-original', $(replaceable).html());
        var word = replaceable.attr('data-replace-word');
        recursive_replace(replaceable, word);
        $(node).attr('data-replaced', true);
    }
};

var recursive_replace = function (node, word) {
    var contents = $(node).contents();
    $.each($(node).contents(), function (_, child) {
        if (child instanceof HTMLElement) {
            recursive_replace(child, word);
        } else if (child instanceof Text) {
            var text = $(child).text().split(' ');
            var replacement_text = [];
            $.each(text, function (_, item) {
                replacement_text.push(word_substitution(item, word));
            });
            replacement_text = replacement_text.join(' ');
            $(child).replaceWith(replacement_text);
        }
    });
}

var word_substitution = function (original, substitute) {
    var saved_words = [
        'a', 'an', 'the',
        'with', 'for', 'to'
    ];
    if (original.trim() == '' || saved_words.indexOf(original.toLowerCase()) >= 0
            || !original.match(/[A-Za-z]/)) {
        return original;
    }

    var prefix = original.match(/^(pre|post|sub|anti|quasi)/);
    substitute = !!prefix ? prefix[0] : '' + substitute;

    var ending = original.match(/(ed|s|ful|ular|ly|less|ing|[\.,:;\!\?])$/);
    substitute += !!ending ? ending[0] : '';

    if (original.toUpperCase() == original) {
        substitute = substitute.toUpperCase();
    } else if (original.slice(0, 1).toUpperCase() == original.slice(0, 1)) {
        substitute = substitute.slice(0, 1).toUpperCase() + substitute.slice(1);
    }

    return substitute;
};

$.each($('.replace[data-start-replaced="true"]'), function (_, node) {
    replace(node);
});

$('.replace').click(function () {
    replace(this);
});
