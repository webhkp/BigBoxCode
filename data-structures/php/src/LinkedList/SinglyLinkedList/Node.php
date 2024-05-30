<?php

declare(strict_types=1);

namespace DataStructure\LinkedList\SinglyLinkedList;

class Node {
    public ?Node $next = null;

    public function __construct(public string $data) {

    }
}
