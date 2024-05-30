<?php

declare(strict_types=1);

require_once __DIR__ . '/../../../vendor/autoload.php';

use DataStructure\LinkedList\SinglyLinkedList\SinglyLinkedList;

$bigboxList = new SinglyLinkedList();

echo "\n\n----------- Singly Linked List Push example -----------\n\n";;

$bigboxList->push('Big');
$bigboxList->push('Box');
$bigboxList->push('Code');

print_r($bigboxList);


echo "\n\n----------- Singly Linked List Pop example -----------\n\n";;

echo "Popped Item: ";
print_r($bigboxList->pop());

echo "Popped Item: ";
print_r($bigboxList->pop());

echo "Popped Item: ";
print_r($bigboxList->pop());

echo "Popped Item: ";
print_r($bigboxList->pop());

// Push items again
$bigboxList->push("Big");
$bigboxList->push("Box");
$bigboxList->push("Code");

echo "\n\n----------- Singly Linked List Shift example -----------\n\n";;

echo "Shift head from list: ";
print_r($bigboxList->shift());

echo "Shift head from list: ";
print_r($bigboxList->shift());

echo "\n\n----------- Singly Linked List Unshift example -----------\n\n";;

echo "Unshift - 'Box' | Result: ";
print_r($bigboxList->unshift("Box"));

echo "Unshift - 'Big' | Result: ";
print_r($bigboxList->unshift("Big"));


echo "\n\n----------- Singly Linked List Get example -----------\n\n";;

echo "Get - at index: 0 | result:";
print_r($bigboxList->get(0));

echo "Get - at index: 2 | result:";
print_r($bigboxList->get(2));

echo "Get - at index: 99 | result:";
print_r($bigboxList->get(99));

echo "\n\n----------- Singly Linked List Set example -----------\n\n";;

echo "\nSet - 'New Val' at index: 0 | result: ";
print_r($bigboxList->set(0, "New Val"));

echo "\nSet - 'Second' at index: 2 | result: ";
print_r($bigboxList->set(2, "Second"));

echo "\nSet - 'Out bound' at index: 99 | result: ";
print_r($bigboxList->set(99, "Out bound"));


echo "\n\n----------- Singly Linked List Insert example -----------\n\n";;

echo "\nInsert - 'New Val 1' at index: 0 | result: ";
print_r($bigboxList->insert(0, "New Val 1"));

echo "\nInsert - 'New Val' at index: 2 | result: ";
print_r($bigboxList->insert(2, "New Val 2"));

echo "\nInsert - 'Out bound' at index: 99 | result: ";
print_r($bigboxList->insert(99, "Out bound"));


echo "\n\n----------- Singly Linked List Remove example -----------\n\n";;

// Reinitialize the list
$bigboxList = new SinglyLinkedList();
$bigboxList->push("Big");
$bigboxList->push("Box");
$bigboxList->push("Code");

echo "Remove - form index: 2 | result:";
print_r($bigboxList->remove(2));

echo "Remove - from index: 0 | result:";
print_r($bigboxList->remove(0));

echo "Remove - form index: 99 | result:";
print_r($bigboxList->remove(99));

echo "List value: ";
$bigboxList->traverse();

echo "\n\n----------- Singly Linked List Reverse example -----------\n\n";;

// Reinitialize the list
$bigboxList = new SinglyLinkedList();
$bigboxList->push("Big");
$bigboxList->push("Box");
$bigboxList->push("Code");
$bigboxList->push("Singly");
$bigboxList->push("Linked");
$bigboxList->push("List");

echo "List value: ";
$bigboxList->traverse();

$bigboxList->reverse();

echo "List value after reverse: ";
$bigboxList->traverse();

echo "\n\n----------- Iterator implementation for Singly Linked List -----------\n\n";;

$bigboxList->rewind();

while($bigboxList->valid()) {
    echo 'Key: ' . $bigboxList->key() . PHP_EOL;
    echo 'Value: ';
    print_r($bigboxList->current());
    echo PHP_EOL;

    $bigboxList->next();
}
