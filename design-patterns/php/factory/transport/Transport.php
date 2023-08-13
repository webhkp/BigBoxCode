<?php
// Transport.php

namespace Factory\Transport;

interface Transport {
    function start();
    function stop();
    function repair();
}