<?php

use DataStructure\LinkedList\SinglyLinkedList\SinglyLinkedList;

describe("SinglyLinkedList", function () {
    describe("Push item to SinglyLinkedList", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
        });

        it("Should have correct head and tail", function () {
            // Initially head and tails should be null
            expect($this->singlyLinkedList->head)->toBeNull();
            expect($this->singlyLinkedList->tail)->toBeNull();

            $this->singlyLinkedList->push("Big");

            expect($this->singlyLinkedList->head->data)->toBe("Big");
            expect($this->singlyLinkedList->tail->data)->toBe("Big");

            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");

            expect($this->singlyLinkedList->head->data)->toBe("Big");
            expect($this->singlyLinkedList->tail->data)->toBe("Code");
        });

        it("Should have correct length", function () {
            expect($this->singlyLinkedList->length)->toBe(0);

            $this->singlyLinkedList->push("Big");

            expect($this->singlyLinkedList->length)->toBe(1);

            $this->singlyLinkedList->push("Box");

            expect($this->singlyLinkedList->length)->toBe(2);

            $this->singlyLinkedList->push("Code");

            expect($this->singlyLinkedList->length)->toBe(3);
        });
    });

    describe("Pop item from SinglyLinkedList", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
            $this->singlyLinkedList->push("Big");
            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");
        });

        it("Should pop item propertly", function () {
            $pop1 = $this->singlyLinkedList->pop();

            expect($pop1->data)->toBe("Code");

            $pop2 = $this->singlyLinkedList->pop();

            expect($pop2->data)->toBe("Box");

            $pop3 = $this->singlyLinkedList->pop();

            expect($pop3->data)->toBe("Big");

            $pop0 = $this->singlyLinkedList->pop();

            expect($pop0)->toBeNull();
        });

        it("Should have correct head and tail", function () {
            expect($this->singlyLinkedList->head->data)->toBe("Big");
            expect($this->singlyLinkedList->tail->data)->toBe("Code");

            $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->head->data)->toBe("Big");
            expect($this->singlyLinkedList->tail->data)->toBe("Box");

            $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->head->data)->toBe("Big");
            expect($this->singlyLinkedList->tail->data)->toBe("Big");

            $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->head)->toBeNull();
            expect($this->singlyLinkedList->tail)->toBeNull();
        });

        it("Should have correct length", function () {
            $pop1 = $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->length)->toBe(2);

            $pop2 = $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->length)->toBe(1);

            $pop3 = $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->length)->toBe(0);

            $pop0 = $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->length)->toBe(0);
        });
    });

    describe("Shift item from SinglyLinkedList", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
            $this->singlyLinkedList->push("Big");
            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");
        });

        it("Should shift head propertly", function () {
            $shift1 = $this->singlyLinkedList->shift();

            expect($shift1->data)->toBe("Big");

            $shift2 = $this->singlyLinkedList->shift();

            expect($shift2->data)->toBe("Box");

            $shift3 = $this->singlyLinkedList->pop();

            expect($shift3->data)->toBe("Code");

            $shift0 = $this->singlyLinkedList->pop();

            expect($shift0)->toBeNull();
        });

        it("Should have correct head and tail", function () {
            $this->singlyLinkedList->shift();

            expect($this->singlyLinkedList->head->data)->toBe("Box");
            expect($this->singlyLinkedList->tail->data)->toBe("Code");

            $this->singlyLinkedList->shift();

            expect($this->singlyLinkedList->head->data)->toBe("Code");
            expect($this->singlyLinkedList->tail->data)->toBe("Code");

            $this->singlyLinkedList->shift();

            expect($this->singlyLinkedList->head)->toBeNull();
            expect($this->singlyLinkedList->tail)->toBeNull();
        });

        it("Should have correct length", function () {
            $this->singlyLinkedList->shift();

            expect($this->singlyLinkedList->length)->toBe(2);

            $this->singlyLinkedList->shift();

            expect($this->singlyLinkedList->length)->toBe(1);

            $this->singlyLinkedList->shift();

            expect($this->singlyLinkedList->length)->toBe(0);

            // Try to pop one more time
            $this->singlyLinkedList->pop();

            expect($this->singlyLinkedList->length)->toBe(0);
        });
    });

    describe("Unhift item from SinglyLinkedList", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
        });

        it("Should unhift head propertly", function () {
            $unshift1 = $this->singlyLinkedList->unshift("Code");

            expect($unshift1)->not->toBeNull();

            $unshift2 = $this->singlyLinkedList->unshift("Box");

            expect($unshift2)->not->toBeNull();
        });

        it("Should have correct head and tail", function () {
            $this->singlyLinkedList->unshift("Code");

            expect($this->singlyLinkedList->head->data)->toBe("Code");
            expect($this->singlyLinkedList->tail->data)->toBe("Code");

            $this->singlyLinkedList->unshift("Box");

            expect($this->singlyLinkedList->head->data)->toBe("Box");
            expect($this->singlyLinkedList->tail->data)->toBe("Code");

            $this->singlyLinkedList->unshift("Big");

            expect($this->singlyLinkedList->head->data)->toBe("Big");
            expect($this->singlyLinkedList->tail->data)->toBe("Code");
        });

        it("Should have correct length", function () {
            $this->singlyLinkedList->unshift("Code");

            expect($this->singlyLinkedList->length)->toBe(1);

            $this->singlyLinkedList->unshift("Box");

            expect($this->singlyLinkedList->length)->toBe(2);

            $this->singlyLinkedList->unshift("Big");

            expect($this->singlyLinkedList->length)->toBe(3);
        });
    });

    describe("Get item from SinglyLinkedList by index", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
            $this->singlyLinkedList->push("Big");
            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");
        });

        it("Should return node at specific index", function () {
            $node0 = $this->singlyLinkedList->get(0);

            expect($node0->data)->toBe("Big");

            $node2 = $this->singlyLinkedList->get(2);

            expect($node2->data)->toBe("Code");
        });

        it("Should return null for invalid index", function () {
            $nodenve = $this->singlyLinkedList->get(-1);

            expect($nodenve)->toBeNull();

            $nodelarge = $this->singlyLinkedList->get(999999);

            expect($nodelarge)->toBeNull();
        });
    });

    describe("Search item in SinglyLinkedList", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
            $this->singlyLinkedList->push("Big");
            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");
        });

        it("Should return correct index of the item", function () {
            $search0 = $this->singlyLinkedList->search("Big");

            expect($search0)->toBe(0);

            $search2 = $this->singlyLinkedList->search("Code");

            expect($search2)->toBe(2);
        });

        it("Should return null for non existing item", function () {
            $searchResult = $this->singlyLinkedList->search("Non existing item");

            expect($searchResult)->toBeNull();
        });
    });

    describe("Set item to SinglyLinkedList by index", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
            $this->singlyLinkedList->push("Big");
            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");
        });

        it("Should set value at node properly", function () {
            $set0 = $this->singlyLinkedList->set(0, "New Val");

            expect($set0)->toBeTruthy();

            $get0 = $this->singlyLinkedList->get(0);

            expect($get0->data)->toBe("New Val");

            $set2 = $this->singlyLinkedList->set(2, "Second");

            expect($set2)->toBeTruthy();

            $get2 = $this->singlyLinkedList->get(2);

            expect($get2->data)->toBe("Second");

            $setN = $this->singlyLinkedList->set(99, "Out Bound");

            expect($setN)->toBeFalsy();
        });

        it("Should handle empty list without any exception", function () {
            $this->singlyLinkedList = new SinglyLinkedList();

            $set0 = $this->singlyLinkedList->set(0, "Out Bound");

            expect($set0)->toBeFalsy();
        });
    });

    describe("Insert item to SinglyLinkedList by index", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
        });

        it("Should insert data at index", function () {
            $insert0 = $this->singlyLinkedList->insert(0, "Big");

            expect($insert0)->toBeTruthy();

            $get0 = $this->singlyLinkedList->get(0);

            expect($get0->data)->toBe("Big");

            $insert1 = $this->singlyLinkedList->insert(1, "Code");

            expect($insert1)->toBeTruthy();

            $get1 = $this->singlyLinkedList->get(1);

            expect($get1->data)->toBe("Code");

            $insert1_1 = $this->singlyLinkedList->insert(1, "Box");

            expect($insert1_1)->toBeTruthy();

            $get1_1 = $this->singlyLinkedList->get(1);

            expect($get1_1->data)->toBe("Box");

            $get1_2 = $this->singlyLinkedList->get(2);

            expect($get1_2->data)->toBe("Code");

            $setN = $this->singlyLinkedList->insert(99, "Out Bound");

            expect($setN)->toBeFalsy();
        });

        it("Should have proper length after insert", function () {
            $this->singlyLinkedList->insert(0, "Big");

            expect($this->singlyLinkedList->length)->toBe(1);

            $this->singlyLinkedList->insert(1, "Code");

            expect($this->singlyLinkedList->length)->toBe(2);

            $this->singlyLinkedList->insert(1, "Box");

            expect($this->singlyLinkedList->length)->toBe(3);

            $this->singlyLinkedList->insert(99, "Out Bound");

            expect($this->singlyLinkedList->length)->toBe(3);
        });
    });

    describe("Remove item from SinglyLinkedList by index", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
            $this->singlyLinkedList->push("Big");
            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");
        });

        it("Should remove data at index", function () {
            $remove2 = $this->singlyLinkedList->remove(2);

            expect($remove2->data)->toBe("Code");

            $get2 = $this->singlyLinkedList->get(2);

            expect($get2)->toBeNull();

            $remove0 = $this->singlyLinkedList->remove(0);

            expect($remove0->data)->toBe("Big");

            $get0 = $this->singlyLinkedList->get(0);

            expect($get0->data)->toBe("Box");

            $removeN = $this->singlyLinkedList->remove(99);

            expect($removeN)->toBeFalsy();
        });

        it("Should have proper length after remove", function () {
            $this->singlyLinkedList->remove(1);

            expect($this->singlyLinkedList->length)->toBe(2);

            $this->singlyLinkedList->remove(99);

            expect($this->singlyLinkedList->length)->toBe(2);
        });
    });

    describe("Reverse SinglyLinkedList", function () {
        beforeEach(function () {
            $this->singlyLinkedList = new SinglyLinkedList();
            $this->singlyLinkedList->push("Big");
            $this->singlyLinkedList->push("Box");
            $this->singlyLinkedList->push("Code");
            $this->singlyLinkedList->push("Singly");
            $this->singlyLinkedList->push("Linked");
            $this->singlyLinkedList->push("List");
        });

        it("Should set head properly", function () {
            $this->singlyLinkedList->reverse();

            expect($this->singlyLinkedList->head->data)->toBe("List");
        });

        it("Should set tail properly", function () {
            $this->singlyLinkedList->reverse();

            expect($this->singlyLinkedList->tail->data)->toBe("Big");
        });

        it("Should set all elements properly", function () {
            $this->singlyLinkedList->reverse();

            $get1 = $this->singlyLinkedList->get(1);

            expect($get1->data)->toBe("Linked");

            $get2 = $this->singlyLinkedList->get(2);

            expect($get2->data)->toBe("Singly");

            $get4 = $this->singlyLinkedList->get(4);

            expect($get4->data)->toBe("Box");
        });

        it("Should not change the length", function () {
            $this->singlyLinkedList->reverse();

            expect($this->singlyLinkedList->length)->toBe(6);
        });
    });
});
