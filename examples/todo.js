import { $, _, Variable } from '../src/main.js'

// Whole thing doesn't bloody work
// TODO Debug this trash

let todos = Variable([])
let input_value = Variable('')

$('.app')
    .insert(
        _()
            .insert(
                _('input')
                    .set_prop('placeholder', 'What needs to be done?')
                    .bind_prop('value', input_value, 'input')
            )
            .insert(
                _('button')
                    .text('Add')
                    .handle('click', () =>
                        todos.update(todos =>
                            todos.value.push({
                                done: false,
                                text: input_value.value
                            })
                        )
                    )
            )
    )
    .loop(
        todos,
        (item, index) =>
            _('li')
                .insert(
                    _('input')
                        .set_prop('type', 'checkbox')
                        .set_prop('checked', item.done)
                        .handle('click', () =>
                            todos.update(
                                todos =>
                                    (todos[index].done = !todos[index].done)
                            )
                        )
                )
                .insert(_('span').text(item.text)),
        () => _('span').text('No items'),
        () => _('ul')
    )
