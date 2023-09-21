<?php
// XorOperation.php

namespace BigBoxCode\DesignPattern\Interpreter\LogicalOp;

class XorOperation implements Operation {
    public function __construct(private Operation $op1, private Operation $op2) {
    }

    public function execute(string $opContext): bool {
        return $this->op1->execute($opContext) xor $this->op2->execute($opContext);
    }
}