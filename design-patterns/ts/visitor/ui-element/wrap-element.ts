// wrap-element.ts

import UIElement from "./ui-element";
import Visitor from "./visitor";

class WrapElement implements UIElement {
    constructor(private text: string, private wrapper: string) {

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

export default WrapElement;