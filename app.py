''' portfolio site app '''
from flask import Flask, render_template
from jinja2.exceptions import TemplateNotFound
import math
import random
from ascii_art import placevalue_patterner

app = Flask(__name__)

@app.route('/')
def mainpage():
    ''' render the home page '''
    data = get_placevalue()
    return render_template('index.html', **data)

@app.route('/<page>')
def subpage(page):
    ''' load an arbitrary subpage '''
    data = get_placevalue()
    try:
        return render_template('%s.html' % page, **data)
    except TemplateNotFound:
        return render_template('notfound.html', **data), 404


def get_placevalue():
    ''' load a placevalue function '''
    placevalue = random.randint(6, 8)

    functions = [
        [lambda x, y: x ** 2 * y ** 2, 'x^2 * y^2'],
        [lambda x, y: x ** 2 + y ** 2, 'x^2 + y^2'],
        [lambda x, y: x ** 4 + y ** 4, 'x^4 + y^4'],
        [lambda x, y: 8 * ((x ** 5) * (y ** 5)), '8 * (x^4 + y^4)'],
        [lambda x, y: 3 * ((x ** 2) - (y ** 2)), '3 * (x^2 - y^2)'],
        [lambda x, y: 6 * ((x ** 4) - (y ** 4)), '6 * (x^4 - y^4)'],
        [lambda x, y: 50 * math.sqrt(x + y), '50 * sqrt(x + y)'],
        [lambda x, y: 5 * math.sqrt(x**2 + y**2), '5 * sqrt(x^2 + y^2)'],
        [lambda x, y: 5 * math.sqrt(abs(x**2 - y**2)), '5 * sqrt(|x^2 - y^2|)'],
    ]
    fun = random.randint(0, len(functions) - 1)
    function = functions[fun]

    return {
        'ascii_header': placevalue_patterner(
            function[0], 128, 256, placevalue),
        'ascii_footer': placevalue_patterner(
            function[0], 32, 256, placevalue, offset_y=129),
        'function': function[1],
        'placevalue': placevalue,
    }


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4444)
