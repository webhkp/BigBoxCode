<?php
// DiskCacheHandler.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Cache;


class DiskCacheHandler extends CacheHandler {
    public function __construct(?CacheHandler $nextCacheHandler) {
        parent::__construct($nextCacheHandler);
    }

    public function handleRequest(Data $data): void {
        if ($data->getType() == DATA_TYPE::DATA && strlen($data->getData()) > 1024) {
            echo "Caching file '" . $data->getKey() . "' in Disk\n";
        } else if ($this->nextCacheHandler != null) {
            $this->nextCacheHandler->handleRequest($data);
        }
    }
}