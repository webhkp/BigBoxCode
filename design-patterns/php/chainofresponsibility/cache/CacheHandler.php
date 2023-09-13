<?php
// CacheHandler.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Cache;


abstract class CacheHandler {
    public function __construct(protected ?CacheHandler $nextCacheHandler) {
    }

    abstract function handleRequest(Data $data): void;
}
