<?php
// Operation.php

namespace BigBoxCode\DesignPattern\Interpreter\LogicalOp;

interface Operation {
    function execute(string $opContext): bool;
}