// Taken from https://www.npmjs.com/package/bezier, simplified a bit.
function prepare(pieces) {
    var fn = ['var ut = 1 - t', '']

    var n = pieces
    while (n--) {
        for (var j = 0; j < n; j += 1) {
            if (n + 1 === pieces) {
                fn.push(
                    'var p' +
                        j +
                        ' = arr[' +
                        j +
                        '] * ut + arr[' +
                        (j + 1) +
                        '] * t'
                )
            } else if (n > 1) {
                fn.push('p' + j + ' = p' + j + ' * ut + p' + (j + 1) + ' * t')
            } else {
                fn.push('return p' + j + ' * ut + p' + (j + 1) + ' * t')
            }
        }
        if (n > 1) fn.push('')
    }

    fn = [
        'return function bezier' + pieces + '(arr, t) {',
        fn
            .map(function (s) {
                return '  ' + s
            })
            .join('\n'),
        '}'
    ].join('\n')

    return Function(fn)()
}

/**
 * A bezier curve
 * @typedef {Object} BezierCurveObject
 * @property {(n: number): Array<number>} get_point Gets a point on the curve,
 *           where n is the position along the curve from 0 to 1.
 * @property {(n: number): Array<Array<number>>} bake_points Get n number of
 *           evenly spaced points on the curve.
 */

/**
 * Produce a bezier curve
 * @param {Array<Array<number>>} points An array of points, where each point is
 *        an array of numbers where each number represents one dimension.
 * @returns {BezierCurveObject} The bezier curve produced.
 */
export let Bezier = points => {
    let bezier_function = prepare(points.length)
    let rearranged_points = Array(points[0].length)
        .fill([])
        .map((v, i) => points.map(x => x[i]))

    let fn = x => {
        return rearranged_points.map(y => bezier_function(y, x))
    }

    return {
        get_point: fn,
        bake_points: n => {
            let increment = 1 / n

            return Array(n)
                .fill(0)
                .map((_, i) => fn(i * increment))
        }
    }
}
