<?php
// AndOperation.php

namespace BigBoxCode\DesignPattern\Interpreter\LogicalOp;

class AndOperation implements Operation {
    public function __construct(private Operation $op1, private Operation $op2) {
    }

    public function execute(string $opContext): bool {
        return $this->op1->execute($opContext) && $this->op2->execute($opContext);
    }
}