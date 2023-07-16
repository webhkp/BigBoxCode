// demo.ts

import Page from "./page";
import PageList from "./page-list";

// Dummy function to populate the pagination list
function populatePageList(): PageList {
    let pageList = new PageList();

    for (let i = 0; i < 10; i++) {
        let page = new Page();
        page.setNumber(i);

        pageList.add(page);
    }

    return pageList;
}


const pageList = populatePageList();
const paginator = pageList.iterator();

while (paginator.hasNext()) {
    const page = paginator.next();

    if (page !== undefined) {
        console.log("Page Number: " + page.getNumber());
        console.log("Page Path: " + page.getPath());
    }
}
