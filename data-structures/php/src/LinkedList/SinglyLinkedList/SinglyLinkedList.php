<?php

declare(strict_types=1);

namespace DataStructure\LinkedList\SinglyLinkedList;

use DataStructure\LinkedList\SinglyLinkedList\Node;
use Iterator;

class SinglyLinkedList implements Iterator{
    public ?Node $head = null;
    public ?Node $tail = null;
    public int $length = 0;

    // For Iterator implementation 
    // Not specifically related to the linked list
    private ?Node $currentNode;
    private int $currentKey = 0;


    public function __construct() {
    }

    // Push node to the end of the list
    public function push(string $data): bool {
        $node = new Node($data);

        // If the list is empty
        // then make this node as head and tail
        if ($this->head === null) {
            $this->head = &$node;
        } else {
            // set the current tail's next value to new node
            $this->tail->next = &$node;
        }

        // Set the tail to this new node
        $this->tail = &$node;

        // Increase the length by 1
        $this->length++;

        return true;
    }

    // Pop the last item
    public function pop(): ?Node {
        // If there is no head
        // then the list does not exist
        if ($this->head === null) {
            return null;
        }

        $current = $this->head;
        $newTail = $current;

        // Traverse through the list
        // and get the second last item as newTail
        while ($current->next !== null) {
            $newTail = $current;
            $current = $current->next;
        }

        // Assign the newTail to the tail
        $this->tail = &$newTail;

        // Delete the next pointer of the tail
        $this->tail->next = null;

        $this->length--;

        // Reset head and tail if it was the last item
        if ($this->length == 0) {
            $this->head = null;
            $this->tail = null;
        }

        // Return the popped item
        return $current;
    }

    // Traverse the list
    public function traverse(): void {
        $current = $this->head;

        while ($current !== null) {
            echo $current->data . PHP_EOL;

            // Change current to the next node
            $current = $current->next;
        }
    }

    // Shift head
    // and make the second item as head
    // also return the first item
    public function shift(): ?Node {
        // If there is no head then return null
        if ($this->head === null) {
            return null;
        }

        $oldHead = $this->head;

        // Set the second item as head
        $this->head = $oldHead->next;

        // Reduce the length by one
        $this->length--;

        if ($this->length === 0) {
            $this->head = null;
            $this->tail = null;
        }

        // Return the head item
        return $oldHead;
    }

    // Unshift head
    // Create new node and set that as head
    public function unshift($value): bool {
        // Create new Node from value
        $newHead = new Node($value);

        if ($this->head === null) {
            $this->tail = &$newHead;
        } else {
            $newHead->next = $this->head;
        }

        // Set the new node as head
        $this->head = $newHead;

        // Increase length by one
        $this->length++;

        return true;
    }

    // Get node by index(sequence numbers)
    // 0 based index (index starts from 0)
    public function get(int $index): ?Node {
        // Check if the index is valid
        if ($index < 0 || $index >= $this->length) {
            return null;
        }

        $selectedNode = $this->head;

        for ($i = 1; $i <= $index; $i++) {
            $selectedNode = $selectedNode->next;
        }

        return $selectedNode;
    }

    // Set data of a specific node at specific index
    // 0 based index(index starts from 0)
    public function set(int $index, string $data): bool {
        $nodeAtIndex = $this->get($index);

        if ($nodeAtIndex) {
            $nodeAtIndex->data = $data;
            return true;
        }

        return false;
    }

    // Search the list for specific data
    public function search(string $data): ?int {
        $current = $this->head;
        $index = 0;

        while ($current) {
            if ($current->data === $data) {
                return $index;
            }

            $current = $current->next;
            $index++;
        }

        return null;
    }

    // Insert new node at a specific index
    // 0 based index(index starts at 0)
    public function insert(int $index, string $data): bool {
        if ($index < 0 || $index > $this->length) {
            return false;
        }

        if ($index === $this->length) {
            $this->push($data);
            return true;
        }

        if ($index === 0) {
            $this->unshift($data);
            return true;
        }

        $newNode = new Node($data);
        $prevNode = $this->get($index - 1);
        $newNode->next = $prevNode->next;
        $prevNode->next = $newNode;

        // Increase length
        $this->length++;

        return true;
    }

    // Remove item at index
    public function remove(int $index): ?Node {
        // Return false if index is out of range
        if ($index < 0 || $index >= $this->length) {
            return null;
        }

        if ($index === 0) {
            return $this->shift();
        }

        if ($index === ($this->length - 1)) {
            return $this->pop();
        }

        $prevNode = $this->get($index - 1);
        $removedNode = $prevNode->next;
        $prevNode->next = $prevNode->next->next;

        $this->length--;

        return $removedNode;
    }

    // Reverse a linked list
    public function reverse(): self {
        $currentNode = $this->head;
        unset($this->tail);
        $prevNode = null;
        $nextNode = null;

        while ($currentNode !== null) {
            $nextNode = $currentNode->next;
            $currentNode->next = $prevNode;

            $prevNode = $currentNode;
            $currentNode = $nextNode;
        }

        $this->tail = $this->head;
        $this->head = $prevNode;
        
        return $this;
    }

    // Part of Iterator interface implementation
    // Get current node
    public function current(): string {
        return $this->currentNode->data;
    }

    // Part of Iterator interface implementation
    // Get current key
    public function key(): int {
        return $this->currentKey;
    }

    // Part of Iterator interface implementation
    // Move to the next item
    public function next(): void {
        $this->currentNode = $this->currentNode->next;
        $this->currentKey++;
    }

    // Part of Iterator interface implementation
    // Rewind the iterator
    public function rewind(): void {
        $this->currentKey = 0;
        $this->currentNode = $this->head;
    }

    // Part of Iterator interface implementation
    // Check is valid
    public function valid(): bool {
        return $this->currentNode !== null;
    }
    
}
