// ui-element.ts

import Visitor from "./visitor";

interface UIElement {
    appendElement(vistor: Visitor): void;
}

export default UIElement;