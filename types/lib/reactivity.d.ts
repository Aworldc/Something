export class Reactive {
    constructor(default_value: any, formatter?: () => void);
    set value(new_value: any);
    get value(): any;
    subscribe(handler: any): void;
    update(updater: any): void;
    as(formatter: any): Reactive;
    #private;
}
//# sourceMappingURL=reactivity.d.ts.map