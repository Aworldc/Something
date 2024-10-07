import { prepare } from 'bezier'

/**
 * A bezier curve
 * @typedef {Object} BezierCurveObject
 * @property {(n: number): Array<number>} get_point Gets a point on the curve,
 *           where n is the positon along the curve from 0 to 1.
 * @property {(n: number): Array<Array<number>>} bake_points Get n number of
 *           evenly spaced points on the curve.
 */

/**
 * Produce a bezier curve
 * @param {Array<Array<number>>} points An array of points, where each point is
 *        an array of numbers where each number represents one dimention.
 * @returns {BezierCurveObject} The bezier curve produced.
 */
export function _bezier(points) {
    console.log(points)

    let bezier_function = prepare(points.length)
    let rearranged_points = Array(points[0].length)
        .fill([])
        .map((v, i) => points.map(x => x[i]))

    console.log(rearranged_points)

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
