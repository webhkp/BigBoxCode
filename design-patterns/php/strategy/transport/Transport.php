<?php
// Transport.php

namespace BigBoxCode\DesignPattern\Strategy\Transport;


interface Transport {
    function start(): void;
    function stop(): void;
    function repair(): void;
    function getInfo(): void;
    function operate(): void;
}