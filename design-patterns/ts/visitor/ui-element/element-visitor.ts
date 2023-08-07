// element-visitor.ts

import HeadElement from "./head-element";
import ListElement from "./list-element";
import TextElement from "./text-element";
import Visitor from "./visitor";
import WrapElement from "./wrap-element";

class ElementVisitor implements Visitor {
    public output: string = '';

    appendContent(textElement: TextElement): void {
        this.output += textElement.getText();
    }

    appendContentWithWrapper(wrapElement: WrapElement | HeadElement): void {
        this.output += `[${wrapElement.getWrapper()}] ${wrapElement.getText()} [/${wrapElement.getWrapper()}]`;
    }

    appendList(listElement: ListElement): void {
        this.output += '[ul]';

        for (let listItem of listElement.getListItems()) {
            this.output += `[li] ${listItem} [/li]`;
        }

        this.output += '[/ul]';
    }
}

export default ElementVisitor;