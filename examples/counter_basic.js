import { $, _, Variable } from '../src/main.js'

let count = Variable(0)

$('.app').insert(
    _('button')
        .text(count.as(current_count => `Clicked ${current_count} times`))
        .handle('click', () => count.value++)
)
