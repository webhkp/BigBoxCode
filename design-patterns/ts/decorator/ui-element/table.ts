// table.ts

import UIElement from "./ui-element";

class Table implements UIElement {
    draw(): void {
        console.log("Drawing Table");
    }
}

export default Table;