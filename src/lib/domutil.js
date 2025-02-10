import { elementBuilder } from './element.js'

/**
 * Selects an element as an {@link elementBuilder}.
 * @param {string} selector The css selector for an element.
 * @returns {elementBuilder} An elementBuilder attached to the dom element associated with the provided selector.
 */
function $(selector) {
    return new elementBuilder().fromDom(document.querySelector(selector))
}

/**
 *
 * @param {string} selector The css selector for a collection of elements.
 * @returns {Array<elementBuilder>} An array containing whose are attached to the DOM elements associated with the provided selector.
 */
function $all(selector) {
    let els = []

    document.querySelectorAll(selector).forEach(el => {
        els.push(new elementBuilder().fromDom(el))
    })

    return els
}

/**
 * Injects css into the current webpage.
 * @param {string} css The css to be injected.
 * @deprecated
 */
function $css(css) {
    document.head.appendChild(document.createElement('style')).innerHTML = css
}

/**
 * Creates a new dom element.
 * @param {string} type The type of element to create.
 * @default type A div.
 * @returns {elementBuilder} An elementBuilder attached to a brand-new dom element of the specified type.
 */
function _(type) {
    return new elementBuilder(type)
}

export { $, $all, $css, _ }
