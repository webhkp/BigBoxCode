// list-element.ts

import UIElement from "./ui-element";
import Visitor from "./visitor";

class ListElement implements UIElement {
    constructor(private lines: string[]) {

    }

    getListItems(): string[] {
        return this.lines
    }

    appendElement(vistor: Visitor): void {
        vistor.appendList(this);
    }
}

export default ListElement;