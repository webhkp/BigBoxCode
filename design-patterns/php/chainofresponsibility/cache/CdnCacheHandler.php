<?php
// CdnCacheHandler.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Cache;


class CdnCacheHandler extends CacheHandler {
    public function __construct(?CacheHandler $nextCacheHandler) {
        parent::__construct($nextCacheHandler);
    }

    public function handleRequest(Data $data): void {
        if ($data->getType() == DATA_TYPE::CSS || $data->getType() == DATA_TYPE::JAVASCRIPT) {
            echo "Caching file '" . $data->getKey() . "' in CDN\n";
        } else if ($this->nextCacheHandler != null) {
            $this->nextCacheHandler->handleRequest($data);
        }
    }
}