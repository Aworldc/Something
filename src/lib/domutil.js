/// <reference path="../../types/lib/domutil.d.ts" />

import { ElementBuilder } from './element.js'

function $(selector) {
    return new ElementBuilder().from_dom(document.querySelector(selector))
}

function $all(selector) {
    let els = []

    document.querySelectorAll(selector).forEach(el => {
        els.push(new ElementBuilder().from_dom(el))
    })

    return els
}

function $css(css) {
    document.head.appendChild(document.createElement('style')).innerHTML = css
}

function _(type) {
    return new ElementBuilder(type)
}

export { $, $all, $css, _ }
