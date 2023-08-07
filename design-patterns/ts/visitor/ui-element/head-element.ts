// head-element.ts

import UIElement from "./ui-element";
import Visitor from "./visitor";

class HeadElement implements UIElement {
    private readonly wrapper: string = 'h1';

    constructor(private text: string) {

    }

    getText(): string {
        return this.text
    }

    getWrapper(): string {
        return this.wrapper;
    }

    appendElement(visitor: Visitor): void {
        visitor.appendContentWithWrapper(this);
    }
}

export default HeadElement;