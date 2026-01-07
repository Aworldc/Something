import { assert, expect, test, vi } from 'vitest'
import {
    _,
    ElementBuilder,
    $,
    $all,
    $css,
    noop,
    get_random_item,
    get_random_between,
    get_random_string,
    Tag,
    Variable,
    Reactive
} from './main.js'

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

test('get_random_item() works', () => {
    let array = ['apple', 'orange', 'banana', 'blueberry', 'raspberry']

    Array(1000)
        .fill(0)
        .forEach(() =>
            expect(get_random_item(array)).toSatisfy(value =>
                array.includes(value)
            )
        )
})

test('get_random_between() works', () => {
    Array(20)
        .fill(0)
        .forEach(() => {
            let min = get_random_between(5, 10)
            let max = get_random_between(15, 20)

            Array(100)
                .fill(0)
                .forEach(() => {
                    let random = get_random_between(min, max)

                    expect(random).toBeGreaterThanOrEqual(min)
                    expect(random).toBeLessThanOrEqual(max)
                })
        })
})

test('get_random_string() works', () => {
    Array(10)
        .fill(0)
        .forEach((v, i) =>
            Array(10)
                .fill(0)
                .forEach(() => expect(get_random_string(i)).toHaveLength(i))
        )
})

test('Variable() works', () => {
    let num = 69
    let my_var = Variable(num)

    expect(Variable(my_var)).toBe(my_var)
    expect(Variable(num)).toBeInstanceOf(Reactive)
    expect(Variable(num).value).toEqual(num)
})

test('ElementBuilder.insert() reactivity works', () => {
    let element = Variable(_('h1').text('Hi'))
    let el = _().insert(element)

    expect(el.to_dom().innerHTML).toEqual('<h1>Hi</h1>')

    element.value = _('h2').text('Bye')

    expect(el.to_dom().innerHTML).toEqual('<h2>Bye</h2>')
})

test('ElementBuilder.get_prop() and set_prop() works', () => {
    let element = _('h1')
        .text('Hi')
        .id('weeee')
        .set_prop('abc', 'value')
        .set_prop('classList', 'some-class')

    expect(element.get_prop('id')).toEqual('weeee')
    expect(element.get_prop('abc')).toEqual('value')
    expect(element.classes()).toEqual(['some-class'])
})

test('Reactive.as() works', () => {
    let my_var = Variable(69)
    let weewoo = my_var.as(num => `The number is ${num}`)

    expect(weewoo.value).toEqual('The number is 69')

    my_var.value++

    expect(weewoo.value).toEqual('The number is 70')
})

test('Reactive.update() works', () => {
    let my_var = Variable([])

    expect(my_var.value).toHaveLength(0)

    my_var.update(my_var => my_var.value.push('x'))

    expect(my_var.value).toHaveLength(1)
    expect(my_var.value[0]).toEqual('x')
})

test('ElementBuilder.handle() works', () => {
    let fn = vi.fn()
    let element = _('button').handle('click', fn)

    expect(fn).toBeCalledTimes(0)

    element.to_dom().click()

    expect(fn).toBeCalledTimes(1)
})

test('ElementBuilder.handle() reactivity works', () => {
    let fn_one = vi.fn()
    let fn_two = vi.fn()

    let fn = Variable(fn_one)

    let element = _('button').handle('click', fn)

    expect(fn_one).toBeCalledTimes(0)
    expect(fn_two).toBeCalledTimes(0)
    expect(fn.value).toBe(fn_one)

    fn.value = fn_two

    element.to_dom().click()

    expect(fn_one).toBeCalledTimes(0)
    expect(fn_two).toBeCalledTimes(1)
    expect(fn.value).toBe(fn_two)
})

test('ElementBuilder.add_class() reactivity works', () => {
    let class_name = Variable('someclass')

    let el = _().add_class(class_name)

    expect(el.classes()).toEqual(['someclass'])

    class_name.value = 'someotherclass'

    expect(el.classes()).toEqual(['someotherclass'])
})

test('ElementBuilder.loop() works', () => {
    let array_one = Array(10)
        .fill(0)
        .map(() => get_random_between(1, 100))
    let array_two = Array(15)
        .fill(0)
        .map(() => get_random_between(1, 100))
    let array_four = []

    let array = Variable(array_four)

    let el = _().loop(
        array,
        item => _('span').text(item),
        () => _('span').text('No items')
    )
    let el2 = _().loop(
        array,
        item => _('li').text(item),
        () => _('p').text('No items'),
        () => _('ul')
    )

    expect(el.to_dom().innerHTML).toEqual(
        '<div style="display: contents;"><span>No items</span></div>'
    )
    expect(el2.to_dom().innerHTML).toEqual(
        '<div style="display: contents;"><p>No items</p></div>'
    )

    array.value = array_one

    expect(el.to_dom().innerHTML).toEqual(
        `<div style="display: contents;">${array_one
            .map(item => `<span>${item}</span>`)
            .join('')}</div>`
    )
    expect(el2.to_dom().innerHTML).toEqual(
        `<div style="display: contents;"><ul>${array_one
            .map(item => `<li>${item}</li>`)
            .join('')}</ul></div>`
    )

    array.value = array_two

    expect(el.to_dom().innerHTML).toEqual(
        `<div style="display: contents;">${array_two
            .map(item => `<span>${item}</span>`)
            .join('')}</div>`
    )
    expect(el2.to_dom().innerHTML).toEqual(
        `<div style="display: contents;"><ul>${array_two
            .map(item => `<li>${item}</li>`)
            .join('')}</ul></div>`
    )

    array.value = array_four

    expect(el.to_dom().innerHTML).toEqual(
        '<div style="display: contents;"><span>No items</span></div>'
    )
    expect(el2.to_dom().innerHTML).toEqual(
        '<div style="display: contents;"><p>No items</p></div>'
    )
})

test('ElementBuilder.sub() works', () => {
    let fn = vi.fn()
    let x = Variable('x')

    let el = _().sub(x, fn)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith('x', 'x', el)

    x.value = 69

    expect(fn).toBeCalledTimes(2)
    expect(fn).toBeCalledWith(69, 'x', el)
})

test('ElementBuilder.bind_prop() works', () => {
    let x = Variable('Some data')
    let el = _().bind_prop('value', x, 'input')

    expect(el.get_prop('value')).toEqual('Some data')

    el.set_prop('value', 'meep')
    el.to_dom().dispatchEvent(new Event('input'))

    expect(x.value).toEqual('meep')
})
