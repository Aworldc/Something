/**
 * Produce a bezier curve
 * @param {Array<Array<number>>} points An array of points, where each point is
 *        an array of numbers where each number represents one dimension.
 * @returns {BezierCurveObject} The bezier curve produced.
 */
export function Bezier(points: Array<Array<number>>): BezierCurveObject

export type BezierCurveObject = {
    /**
     * Gets a point on the curve,
     * where n is the position along the curve from 0 to 1.
     */
    get_point: (n: number) => any
}
