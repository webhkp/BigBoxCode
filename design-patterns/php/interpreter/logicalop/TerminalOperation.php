<?php
// TerminalOperation.php

namespace BigBoxCode\DesignPattern\Interpreter\LogicalOp;


class TerminalOperation implements Operation {

    public function __construct(private string $data) {
    }

    public function execute(string $opContext): bool {
        return str_contains($opContext, $this->data);
    }
}