// table.ts

import Color from "./color";
import UIElement from "./ui-element";

class Table extends UIElement {
    constructor(color: Color) {
        super(color);
    }
    public printElement(): void {
        this.color.setColor();

        console.log("Printing Table");
    }
}

export default Table;