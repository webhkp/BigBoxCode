<?php
// Transport.php

namespace Factory\TransportMethod;

interface Transport {
    function start();
    function stop();
    function repair();
}