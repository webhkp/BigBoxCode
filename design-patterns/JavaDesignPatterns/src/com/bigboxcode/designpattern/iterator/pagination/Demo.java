package com.bigboxcode.designpattern.iterator.pagination;

public class Demo {
    public static void main(String[] args) {
        PageList pageList = populatePageList();
        AbstractIterator paginator = pageList.iterator();

        while(paginator.hasNext()) {
            Page page = paginator.next();

            System.out.println("Page Number: " + page.getNumber());
            System.out.println("Page Path: " + page.getPath());

            System.out.println("----------------------------------------");
        }
    }

    // Dummy function to populate the pagination list
    private static PageList populatePageList() {
        PageList pageList = new PageList();

        for (int i = 0; i < 10; i++) {
            Page page = new Page();
            page.setNumber(i);

            pageList.add(page);
        }

        return pageList;
    }
}
