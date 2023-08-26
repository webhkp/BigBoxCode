<?php
// Api.php

namespace BigBoxCode\DesignPattern\Adapter\FileAdapter;


interface Api {
    function fetchData(): string;
    function sendData(string $data): void;
}