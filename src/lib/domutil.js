import { elementBuilder } from './element.js'

function $(selector) {
    return new elementBuilder().fromDom(document.querySelector(selector))
}

function $all(selector) {
    let els = []

    document.querySelectorAll(selector).forEach(el => {
        els.push(new elementBuilder().fromDom(el))
    })

    return els
}

function $css(css) {
    document.head.appendChild(document.createElement('style')).innerHTML = css
}

function _(type) {
    return new elementBuilder(type)
}

export { $, $all, $css, _ }
