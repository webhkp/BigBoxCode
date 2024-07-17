# from .singly_linked_list import SinglyLinkedList
from .singly_linked_list import SinglyLinkedList

def main():
    big_box_list = SinglyLinkedList()

    print("----------- Singly Linked List Push example -----------\n")

    big_box_list.push("Big")
    big_box_list.push("Box")
    big_box_list.push("Code")

    big_box_list.traverse()

    print("\n\n----------- Singly Linked List Pop example -----------\n")

    popped_item = big_box_list.pop()
    print("Poppped item: ", popped_item.data)

    popped_item = big_box_list.pop()
    print("Poppped item: ", popped_item.data)

    popped_item = big_box_list.pop()
    print("Poppped item: ", popped_item.data)

    print("Poppped item: ", big_box_list.pop())

    # Push some items again
    big_box_list.push("Big")
    big_box_list.push("Box")
    big_box_list.push("Code")

    print("\n\n----------- Singly Linked List Shift example -----------\n")

    print("Shift head from list: ", big_box_list.shift())

    print("Shift head from list: ", big_box_list.shift())

    print("\n\n----------- Singly Linked List Unshift example -----------\n")

    print("Unshift - 'Box' | Result: ", big_box_list.unshift("Box"))
    print("Unshift - 'Box' | Result: ", big_box_list.unshift("Big"))

    print("\n\n----------- Singly Linked List Get example -----------\n")

    print("Get - at index: 0 | result:", big_box_list.get(0))
    print("Get - at index: 2 | result:", big_box_list.get(2))
    print("Get - at index: 99 | result:", big_box_list.get(99))

    print("\n\n----------- Singly Linked List Set example -----------\n")

    print("Set - 'New Val' at index: 0 | result: ", big_box_list.set(0, "New Val"))
    print("Set - 'Second' at index: 2 | result: ", big_box_list.set(2, "Second"))
    print(
        "Set - 'Out bound' at index: 99 | result: ", big_box_list.set(99, "Out bound")
    )

    print("\n\n----------- Singly Linked List Insert example -----------\n")

    print(
        "\nInsert - 'New Val 1' at index: 0 | result: ",
        big_box_list.insert(0, "New Val 1"),
    )
    print(
        "\nInsert - 'New Val' at index: 2 | result: ",
        big_box_list.insert(2, "New Val 2"),
    )
    print(
        "\nInsert - 'Out bound' at index: 99 | result: ",
        big_box_list.insert(99, "Out bound"),
    )

    print("\n\n----------- Singly Linked List Remove example -----------\n")

    # Reinitialize the list
    big_box_list = SinglyLinkedList()
    big_box_list.push("Big")
    big_box_list.push("Box")
    big_box_list.push("Code")

    print("Remove - form index: 2 | result:", big_box_list.remove(2))

    print("Remove - from index: 0 | result:", big_box_list.remove(0))

    print("Remove - form index: 99 | result:", big_box_list.remove(99))

    print("List value: ")
    big_box_list.traverse()

    print("\n\n----------- Singly Linked List Reverse example -----------\n")

    # Reinitialize the list
    big_box_list = SinglyLinkedList()
    big_box_list.push("Big")
    big_box_list.push("Box")
    big_box_list.push("Code")
    big_box_list.push("Singly")
    big_box_list.push("Linked")
    big_box_list.push("List")

    print("List value: ")
    big_box_list.traverse()

    big_box_list.reverse()

    print("\nList value after reverse: ")
    big_box_list.traverse()

if __name__ == "__main__":
    main()