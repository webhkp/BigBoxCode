// background-decorator.ts

import UIDecorator from "./ui-decorator";
import UIElement from "./ui-element";


class BackgroundDecorator extends UIDecorator {
    constructor(uiElement: UIElement) {
        super(uiElement);
    }

    draw(): void {
        super.draw();
        console.log("Adding Background to the element");
    }
}

export default BackgroundDecorator;