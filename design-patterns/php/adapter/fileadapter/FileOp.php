<?php
// FileOp.php

namespace BigBoxCode\DesignPattern\Adapter\FileAdapter;

interface FileOp {
    function readFile(): string;
    function writeFile(string $input): void;
}