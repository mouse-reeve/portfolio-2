''' print out binary place value patterns '''

def placevalue_patterner(function, height, width, placevalue, offset_y=0):
    ''' create a visualization of a place value pattern '''
    pad = placevalue + 20
    visual = []
    for i in range(offset_y, offset_y + height):
        row = ''
        for j in range(width):
            value = function(i, j)
            binary = '{0:b}'.format(int(value))
            leftpad = '0' * (pad - len(binary)) + binary
            char = leftpad[-1 * placevalue]
            row += ' ' if char == '0' else '*'
        visual.append(row)
    return '\n'.join(visual)

