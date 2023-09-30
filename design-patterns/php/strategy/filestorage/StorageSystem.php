<?php
// StorageStrategy.php

namespace BigBoxCode\DesignPattern\Strategy\FileStorage;


interface StorageSystem {
    function storeFile(string $tempPath): int;
    function retrieveFile(int $fileId): string;
    function printFileInfo(int $fileId): void;
}