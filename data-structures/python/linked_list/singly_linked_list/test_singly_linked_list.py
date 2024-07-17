import unittest
from .singly_linked_list import SinglyLinkedList


class TestSinglyLinkedListPush(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()

    def test_head_and_tail(self):
        # Initially head and tails should be null
        self.assertIsNone(self.singly_linked_list.head)
        self.assertIsNone(self.singly_linked_list.tail)

        self.singly_linked_list.push("Big")

        self.assertEqual(self.singly_linked_list.head.data, "Big")
        self.assertEqual(self.singly_linked_list.tail.data, "Big")

        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")

        self.assertEqual(self.singly_linked_list.head.data, "Big")
        self.assertEqual(self.singly_linked_list.tail.data, "Code")

    def test_list_length(self):
        self.assertEqual(self.singly_linked_list.length, 0)

        self.singly_linked_list.push("Big")

        self.assertEqual(self.singly_linked_list.length, 1)

        self.singly_linked_list.push("Box")

        self.assertEqual(self.singly_linked_list.length, 2)

        self.singly_linked_list.push("Code")

        self.assertEqual(self.singly_linked_list.length, 3)


class TestSinglyLinkedListPop(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
        self.singly_linked_list.push("Big")
        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")

    def test_pop_process(self):
        pop1 = self.singly_linked_list.pop()

        self.assertEqual(pop1.data, "Code")

        pop2 = self.singly_linked_list.pop()

        self.assertEqual(pop2.data, "Box")

        pop3 = self.singly_linked_list.pop()

        self.assertEqual(pop3.data, "Big")

        pop0 = self.singly_linked_list.pop()

        self.assertIsNone(pop0)

    def test_head_and_tail_after_pop(self):
        self.assertEqual(self.singly_linked_list.head.data, "Big")
        self.assertEqual(self.singly_linked_list.tail.data, "Code")

        self.singly_linked_list.pop()

        self.assertEqual(self.singly_linked_list.head.data, "Big")
        self.assertEqual(self.singly_linked_list.tail.data, "Box")

        self.singly_linked_list.pop()

        self.assertEqual(self.singly_linked_list.head.data, "Big")
        self.assertEqual(self.singly_linked_list.tail.data, "Big")

        self.singly_linked_list.pop()

        self.assertIsNone(self.singly_linked_list.head)
        self.assertIsNone(self.singly_linked_list.tail)

    def test_length_after_pop(self):
        self.singly_linked_list.pop()

        self.assertEqual(self.singly_linked_list.length, 2)

        self.singly_linked_list.pop()

        self.assertEqual(self.singly_linked_list.length, 1)

        self.singly_linked_list.pop()

        self.assertEqual(self.singly_linked_list.length, 0)

        self.singly_linked_list.pop()

        self.assertEqual(self.singly_linked_list.length, 0)


class TestSinglyLinkedListShift(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
        self.singly_linked_list.push("Big")
        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")

    def test_head_shift(self):
        shift1 = self.singly_linked_list.shift()

        self.assertEqual(shift1.data, "Big")

        shift2 = self.singly_linked_list.shift()

        self.assertEqual(shift2.data, "Box")

        shift3 = self.singly_linked_list.pop()

        self.assertEqual(shift3.data, "Code")

        shift0 = self.singly_linked_list.pop()

        self.assertIsNone(shift0)

    def test_head_and_tail_after_shift(self):
        self.singly_linked_list.shift()

        self.assertEqual(self.singly_linked_list.head.data, "Box")
        self.assertEqual(self.singly_linked_list.tail.data, "Code")

        self.singly_linked_list.shift()

        self.assertEqual(self.singly_linked_list.head.data, "Code")
        self.assertEqual(self.singly_linked_list.tail.data, "Code")

        self.singly_linked_list.shift()

        self.assertIsNone(self.singly_linked_list.head)
        self.assertIsNone(self.singly_linked_list.tail)

    def test_length_after_shift(self):
        self.singly_linked_list.shift()

        self.assertEqual(self.singly_linked_list.length, 2)

        self.singly_linked_list.shift()

        self.assertEqual(self.singly_linked_list.length, 1)

        self.singly_linked_list.shift()

        self.assertEqual(self.singly_linked_list.length, 0)

        # Try to pop one more time
        self.singly_linked_list.pop()
        
        self.assertEqual(self.singly_linked_list.length, 0)


class TestSinglyLinkedListUnshif(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
    

    def test_head(self):
        unshift1 = self.singly_linked_list.unshift("Code")

        self.assertIsNotNone(unshift1)

        unshift2 = self.singly_linked_list.unshift("Box")

        self.assertIsNotNone(unshift2)

    def test_heand_and_tail(self):
        self.singly_linked_list.unshift("Code")

        self.assertEqual(self.singly_linked_list.head.data, "Code")
        self.assertEqual(self.singly_linked_list.tail.data, "Code")

        self.singly_linked_list.unshift("Box")

        self.assertEqual(self.singly_linked_list.head.data, "Box")
        self.assertEqual(self.singly_linked_list.tail.data, "Code")

        self.singly_linked_list.unshift("Big")

        self.assertEqual(self.singly_linked_list.head.data, "Big")
        self.assertEqual(self.singly_linked_list.tail.data, "Code")

    def test_length(self):
        self.singly_linked_list.unshift("Code")

        self.assertEqual(self.singly_linked_list.length, 1)

        self.singly_linked_list.unshift("Box")

        self.assertEqual(self.singly_linked_list.length, 2)

        self.singly_linked_list.unshift("Big")

        self.assertEqual(self.singly_linked_list.length, 3)

class TestSinglyLinkedListGetByIndex(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
        self.singly_linked_list.push("Big")
        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")

    def test_return_value(self):
        node0 = self.singly_linked_list.get(0)

        self.assertEqual(node0.data, "Big")

        node2 = self.singly_linked_list.get(2)

        self.assertEqual(node2.data, "Code")

    def test_invalid_index(self):
        nodenve = self.singly_linked_list.get(-1)

        self.assertIsNone(nodenve)

        nodelarge = self.singly_linked_list.get(999999)

        self.assertIsNone(nodelarge)

class TestSinglyLinkedListSearch(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
        self.singly_linked_list.push("Big")
        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")

    def test_returned_index(self):
        search0 = self.singly_linked_list.search("Big")

        self.assertEqual(search0, 0)

        search2 = self.singly_linked_list.search("Code")

        self.assertEqual(search2, 2)

    def test_return_null_for_non_existing(self):
        searchResult = self.singly_linked_list.search("Non existing item")

        self.assertIsNone(searchResult)

class TestSinglyLinkedListSet(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
        self.singly_linked_list.push("Big")
        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")

    def test_set(self):
        set0 = self.singly_linked_list.set(0, "New Val")

        self.assertTrue(set0)

        get0 = self.singly_linked_list.get(0)

        self.assertEqual(get0.data, "New Val")

        set2 = self.singly_linked_list.set(2, "Second")

        self.assertTrue(set2)

        get2 = self.singly_linked_list.get(2)

        self.assertEqual(get2.data, "Second")

        setN = self.singly_linked_list.set(99, "Out Bound")

        self.assertFalse(setN)

    def test_handle_empty_list(self):
        self.singly_linked_list = SinglyLinkedList()

        set0 = self.singly_linked_list.set(0, "Out Bound")

        self.assertFalse(set0)

class TestSinglyLinkedListInsertByIndex(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()

    def test_data_insert(self):
        insert0 = self.singly_linked_list.insert(0, "Big")

        self.assertTrue(insert0)

        get0 = self.singly_linked_list.get(0)

        self.assertEqual(get0.data, "Big")

        insert1 = self.singly_linked_list.insert(1, "Code")

        self.assertTrue(insert1)

        get1 = self.singly_linked_list.get(1)

        self.assertEqual(get1.data, "Code")

        insert1_1 = self.singly_linked_list.insert(1, "Box")

        self.assertTrue(insert1_1)

        get1_1 = self.singly_linked_list.get(1)

        self.assertEqual(get1_1.data, "Box")

        get1_2 = self.singly_linked_list.get(2)

        self.assertEqual(get1_2.data, "Code")

        setN = self.singly_linked_list.insert(99, "Out Bound")

        self.assertFalse(setN)

    def test_length_after_insert(self):
        self.singly_linked_list.insert(0, "Big")

        self.assertEqual(self.singly_linked_list.length, 1)

        self.singly_linked_list.insert(1, "Code")

        self.assertEqual(self.singly_linked_list.length, 2)

        self.singly_linked_list.insert(1, "Box")

        self.assertEqual(self.singly_linked_list.length, 3)

        self.singly_linked_list.insert(99, "Out Bound")

        self.assertEqual(self.singly_linked_list.length, 3)

class TestSinglyLinkedListRemoveByIndex(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
        self.singly_linked_list.push("Big")
        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")

    def test_remove(self):
        remove2 = self.singly_linked_list.remove(2)

        self.assertEqual(remove2.data, "Code")

        get2 = self.singly_linked_list.get(2)

        self.assertIsNone(get2)

        remove0 = self.singly_linked_list.remove(0)

        self.assertEqual(remove0.data, "Big")

        get0 = self.singly_linked_list.get(0)

        self.assertEqual(get0.data, "Box")

        removeN = self.singly_linked_list.remove(99)

        self.assertFalse(removeN)

    def test_length_after_remove(self):
        self.singly_linked_list.remove(1)

        self.assertEqual(self.singly_linked_list.length, 2)

        self.singly_linked_list.remove(99)

        self.assertEqual(self.singly_linked_list.length, 2)

class TestSinglyLinkedListRevere(unittest.TestCase):
    def setUp(self):
        self.singly_linked_list = SinglyLinkedList()
        self.singly_linked_list.push("Big")
        self.singly_linked_list.push("Box")
        self.singly_linked_list.push("Code")
        self.singly_linked_list.push("Singly")
        self.singly_linked_list.push("Linked")
        self.singly_linked_list.push("List")

    def test_head_after_reverse(self):
        self.singly_linked_list.reverse()

        self.assertEqual(self.singly_linked_list.head.data, "List")

    def test_tail_after_reverse(self):
        self.singly_linked_list.reverse()

        self.assertEqual(self.singly_linked_list.tail.data, "Big")

    def test_elements_after_reverse(self):
        self.singly_linked_list.reverse()

        get1 = self.singly_linked_list.get(1)

        self.assertEqual(get1.data, "Linked")

        get2 = self.singly_linked_list.get(2)

        self.assertEqual(get2.data, "Singly")

        get4 = self.singly_linked_list.get(4)

        self.assertEqual(get4.data, "Box")

    def test_length_after_reverse(self):
        self.singly_linked_list.reverse()

        self.assertEqual(self.singly_linked_list.length, 6)


if __name__ == "__main__":
    unittest.main()
