// visitor.ts

import ListElement from "./list-element";
import HeadElement from "./head-element";
import TextElement from "./text-element";
import WrapElement from "./wrap-element";

interface Visitor {
    appendContent(textElement: TextElement): void;
    appendContentWithWrapper(wrapElement: WrapElement | HeadElement): void;
    appendList(listElement: ListElement): void;
}

export default Visitor;