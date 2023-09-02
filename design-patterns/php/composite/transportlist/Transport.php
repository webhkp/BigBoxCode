<?php
// Transport.php

namespace BigBoxCode\DesignPattern\Composite\TransportList;


interface Transport {
    function start(): void;
    function operate(): void;
    function stop(): void;
}