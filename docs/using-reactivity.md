# Using reactivity

<kbd><a href="/docs/index.md">Home</a></kbd> / <kbd>Using
Reactivity</kbd><br><br>

Starting from where we left off, in [getting started](/docs/get-started.md),
let's change the `h1` to a `button` and change it's text to "Clicked 0 times".

Yep, that's right, we're doing a counter app. How original.

## Events

At the end of the `.text` call, call `.handle` on the button.
`ElementBuilder.handle` is a function for handling events---Just as the function
name (and this section's name) implies.

First argument: Event type (Use `'click'` here); Second argument: A callback.
Just use something like `() => alert("Clicked")` here so you can see if it works
(spolier: it should).

## The `Variable` function

Boring stuff: Start by importing `Variable`. Also from `@aworldc/something`, of
course.

Then, we need to create a variable. Just after the imports, assign `Variable(0)`
to a name like `count`.

This made that name a `Reactive`, so one can subscribe to changes to the
variable. It also gave that reactive a value of 0.

## Current code

You should now have something along the lines of

```javascript
import { $, _, Variable } from '@aworldc/something'

let count = Variable(0)

$('.app')
    .insert(_('button').text('Clicked 0 times'))
    .handle('click', () => alert('Clicked'))
```

## Updating a Reactive

Reactives can be updated with `Reactive.value = <whatever>`. Let's make the
button increment the counter on click. Can you figure that out?

## Updating the button's state

Changing a reactive is cool and all, but out of the box, changing a reactive
only changes a reactive. Even you should know that.

We need to do something useful with the count. Currently the button says
"Clicked 0 times" no matter what. We want it to actually reflect the value of
count.

Replace `'Clicked 0 times'` with

```javascript
count.as(current_count => `Clicked ${current_count} times`)
```

This will give the call to `.text` a _formatted reactive_---That is, a clone of
a Reactive that calls a formatter function when getting it's value.

## The final code

You should now have something along the lines of

```javascript
import { $, _, Variable } from '@aworldc/something'

let count = Variable(0)

$('.app')
    .insert(
        _('button').text(
            count.as(current_count => `Clicked ${current_count} times`)
        )
    )
    .handle('click', () => count.value++)
```
