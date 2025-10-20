import { $, $css, _, Variable } from '../src/main.js'

let count = Variable(0)

// $css is a depreciated way to style things, but I'm
// using it here just so the examples are self contained.
// Please use a seperate css file and/or tailwind.
$css(`
    .app {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
    }
`)

$('.app')
    .insert(
        _('button')
            .text('Increment')
            .handle('click', () => count.value++)
    )
    .insert(_('span').text(count))
    .insert(
        _('button')
            .text('Decrement')
            .handle('click', () => count.value--)
    )
