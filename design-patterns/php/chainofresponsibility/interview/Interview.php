<?php
// Interview.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Interview;


abstract class Interview {
    public function __construct(protected ?Interview $nextInterview) {
    }

    abstract function execute(): void;
}