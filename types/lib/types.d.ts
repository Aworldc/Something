import { Reactive } from './reactivity.js'

export type MaybeReactive<T> = T | Reactive<T>
