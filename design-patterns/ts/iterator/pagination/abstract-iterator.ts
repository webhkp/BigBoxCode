// abstract-iterator.ts

import Page from "./page";

interface AbstractIterator {
    hasNext(): boolean;
    next(): Page | undefined;
}

export default AbstractIterator;