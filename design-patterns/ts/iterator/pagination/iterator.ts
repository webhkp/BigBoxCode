// iterator.ts

import AbstractIterator from "./abstract-iterator";
import Page from "./page";

class Iterator implements AbstractIterator {
    private currentPosition: number = 0;
    private readonly pages = new Map<number, Page>();

    constructor(pages: Map<number, Page>) {
        this.pages = pages;
    }

    hasNext(): boolean {
        return this.currentPosition < this.pages.size;
    }

    next(): Page | undefined {
        const page = this.pages.get(this.currentPosition);
        this.currentPosition++;

        return page;
    }
}

export default Iterator;