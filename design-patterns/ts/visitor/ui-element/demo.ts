// demo.ts

import ElementVisitor from './element-visitor';
import HeadElement from './head-element';
import ListElement from './list-element';
import TextElement from './text-element';
import UIElement from './ui-element';
import WrapElement from './wrap-element';

// set the list of elements we want print
const uiElements: UIElement[] = [
    new HeadElement('My Heading'),
    new TextElement('First line of text'),
    new ListElement(['abc', 'def', 'ghi', 'jkl']),
    new WrapElement('Content wrapped with div', 'div'),
    new TextElement('Last line of text'),
];

const visitor = new ElementVisitor();

for (let element of uiElements) {
    element.appendElement(visitor);
}

// let's check the output
console.log(visitor.output);

