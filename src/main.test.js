import { expect, test, vi } from 'vitest'
import { _, ElementBuilder, $, $all, $css, noop } from './main.js'

let example_tagnames = ['h1', 'div', 'span', 'button', 'img']

test('_ creates an ElementBuilder', () => {
    expect(_()).toBeInstanceOf(ElementBuilder)
})

test('_ without arguments makes a div', () => {
    expect(_()._domEl.tagName).toBe('DIV')
})

test('_ with an argument makes the correct type', () => {
    for (let tag of example_tagnames) {
        expect(_(tag)._domEl.tagName).toBe(tag.toUpperCase())
    }
})

test('ElementBuilder.to_dom() works', () => {
    for (let tag of example_tagnames) {
        let el = _(tag)
        expect(el.to_dom()).toBe(el._domEl)
    }
})

test('ElementBuilder.get() works', () => {
    for (let tag of example_tagnames) {
        let el = _(tag)
        expect(el.get()).toBe(el)
    }
})

test('ElementBuilder.from_dom() works', () => {
    for (let tag of example_tagnames) {
        let el = _(tag).to_dom()
        expect(_().from_dom(el)).toHaveProperty('_domEl', el)
    }
})

test('ElementBuilder.if(true) works', () => {
    for (let tag of example_tagnames) {
        let el = _(tag)
        let fn = vi.fn()

        el.if(true, fn)

        expect(fn).toHaveBeenCalledExactlyOnceWith(el)
    }
})

test('ElementBuilder.if(false) works', () => {
    for (let tag of example_tagnames) {
        let el = _(tag)
        let fn = vi.fn()

        el.if(false, fn)

        expect(fn).not.toBeCalled()
    }
})

test('ElementBuilder.process() works', () => {
    for (let tag of example_tagnames) {
        let el = _(tag)
        let fn = vi.fn()

        el.process(fn)

        expect(fn).toHaveBeenCalledExactlyOnceWith(el)
    }
})

test('$ works', () => {
    document.body.innerHTML +=
        '<div class="wrapper-1"><h1 class="title">Title</h1></div>'
    expect($('.wrapper-1')._domEl.innerHTML).toEqual(
        '<h1 class="title">Title</h1>'
    )
})

test('$all works', () => {
    document.body.innerHTML += `
            <div class="wrapper-2">
                <h1 class="title">TitleOne</h1>
                <h1 class="title">TitleTwo</h1>
                <h1 class="title">TitleThree</h1>
                <h1 class="title">TitleFour</h1>
            </div>
        `
    expect($all('.wrapper-2 > *').map(x => x._domEl.outerHTML)).toEqual([
        '<h1 class="title">TitleOne</h1>',
        '<h1 class="title">TitleTwo</h1>',
        '<h1 class="title">TitleThree</h1>',
        '<h1 class="title">TitleFour</h1>'
    ])
})

test('$css works', () => {
    let css = 'main { fucks-given: 0; }'

    $css(css)

    expect($('style')._domEl.innerHTML).toEqual(css)
})

test('ElementBuilder.text() works', () => {
    let text = 'qwertyuiop'

    expect(_().text(text)._domEl.textContent).toEqual(text)
})

test('ElementBuilder.insert() works', () => {
    expect(_().insert(_().text('qwertyuiop'))._domEl.innerHTML).toEqual(
        '<div>qwertyuiop</div>'
    )
})

test('ElementBuilder.style() works', () => {
    expect(
        _().style('background-color', 'red')._domEl.style.backgroundColor
    ).toEqual('red')
})

test('ElementBuilder.set_cssvar() works', () => {
    expect(
        _()
            .set_cssvar('whatever', 69420)
            ._domEl.style.getPropertyValue('--whatever')
    ).toEqual('69420')
})

test('ElementBuilder.get_cssvar() works', () => {
    let el = _()

    el._domEl.style.setProperty('--whatever', 69420)

    expect(el.get_cssvar('whatever')).toEqual('69420')
})

test('noop() works', () => {
    expect(noop()).toBeUndefined()
    expect(noop.toString()).toBe('() => {}')
})

test('ElementBuilder.clear() works', () => {
    let el = _().insert(_().text('hi'))

    expect(el._domEl.innerHTML).not.toEqual('')

    el.clear()

    expect(el._domEl.innerHTML).toEqual('')
})

test("Huge flamin' class test", () => {
    document.body.innerHTML +=
        '<div class="wrapper-4"><h1 class="title">Title</h1></div>'

    expect($('.wrapper-4 > h1').has_class('title')).toEqual(true)
    expect($('.wrapper-4 > h1').has_class('another-class')).toEqual(false)

    let yescb_one = vi.fn()
    let nocb_one = vi.fn()
    let yescb_two = vi.fn()
    let nocb_two = vi.fn()

    $('.wrapper-4 > h1').if_class('title', yescb_one, nocb_one)
    $('.wrapper-4 > h1').if_class('another-class', yescb_two, nocb_two)

    expect(yescb_one).toBeCalledTimes(1)
    expect(nocb_one).toBeCalledTimes(0)
    expect(yescb_two).toBeCalledTimes(0)
    expect(nocb_two).toBeCalledTimes(1)

    $('.wrapper-4 > h1').toggle_class('title')
    $('.wrapper-4 > h1').toggle_class('another-class')

    expect($('.wrapper-4 > h1').has_class('title')).toEqual(false)
    expect($('.wrapper-4 > h1').has_class('another-class')).toEqual(true)
    expect($('.wrapper-4 > h1').has_class('yet-another-class')).toEqual(false)

    $('.wrapper-4 > h1').replace_class('another-class', 'yet-another-class')

    expect($('.wrapper-4 > h1').has_class('another-class')).toEqual(false)
    expect($('.wrapper-4 > h1').has_class('yet-another-class')).toEqual(true)

    expect($('.wrapper-4 > h1').classes()).toEqual(['yet-another-class'])

    $('.wrapper-4 > h1').add_class('another-class').add_class('title')

    expect($('.wrapper-4 > h1').classes()).toEqual([
        'yet-another-class',
        'another-class',
        'title'
    ])

    $('.wrapper-4 > h1').remove_class('another-class')

    expect($('.wrapper-4 > h1').classes()).toEqual([
        'yet-another-class',
        'title'
    ])
})

test('ElementBuilder.id() works', () => {
    expect(_().id('some-id')._domEl.id).toEqual('some-id')
})
