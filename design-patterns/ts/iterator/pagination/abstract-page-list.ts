// abstract_page_list.ts

import AbstractIterator from "./abstract-iterator";
import Page from "./page";

interface AbstractPageList {
    add(page: Page): void;
    remove(page: Page): void;
    iterator(): AbstractIterator;
}

export default AbstractPageList;