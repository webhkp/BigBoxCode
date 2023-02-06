<?php
require 'vendor/autoload.php';


$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host'   => 'localhost',
    'port'   => 6379,
]);

set_time_limit(0);
header('Content-Type: text/event-stream');
header('Connection: keep-alive');
header('Cache-Control: no-store');

header('Access-Control-Allow-Origin: *');

$pubsub = $redisClient->pubSubLoop();
$pubsub->subscribe('message_update');

foreach ($pubsub as $message) {
    switch ($message->kind) {
        case 'subscribe':
            $data = "Subscribed to {$message->channel}\n";
            break;

        case 'message':
            $data = date('Y-m-d H:i:s') . ": " . $message->payload;
            break;
    }

    echo "data: " . $data . "\n\n";

    ob_flush();
    flush();
}

unset($pubsub);
