// page-list.ts

import AbstractIterator from "./abstract-iterator";
import AbstractPageList from "./abstract-page-list";
import Iterator from "./iterator";
import Page from "./page";


class PageList implements AbstractPageList {
    private pages = new Map<number, Page>();;

    add(page: Page): void {
        this.pages.set(page.getNumber(), page);
    }

    remove(page: Page): void {
        this.pages.delete(page.getNumber());
    }

    iterator(): AbstractIterator {
        return new Iterator(this.pages);
    }
}

export default PageList;