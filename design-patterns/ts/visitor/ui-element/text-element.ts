// text-element.ts

import UIElement from "./ui-element";
import Visitor from "./visitor";

class TextElement implements UIElement {
    constructor(private text: string) {

    }

    getText(): string {
        return this.text
    }

    appendElement(visitor: Visitor): void {
        visitor.appendContent(this);
    }
}

export default TextElement;