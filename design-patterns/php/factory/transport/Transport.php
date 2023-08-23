<?php
// Transport.php

namespace BigBoxCode\DesignPattern\Factory\Transport;

interface Transport {
    function start();
    function stop();
    function repair();
}