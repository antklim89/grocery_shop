

declare module 'bootstrap/js/src/*' {}

declare module 'bootstrap/js/src/collapse' {
    export default class Collapse {
        constructor(doc: HTMLElement, opts: {toggle: boolean})

        show(): void

        hide(): void
    }
}
