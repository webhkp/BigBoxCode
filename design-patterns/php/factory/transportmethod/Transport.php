<?php
// Transport.php

namespace BigBoxCode\DesignPattern\Factory\TransportMethod;

interface Transport {
    function start();
    function stop();
    function repair();
}