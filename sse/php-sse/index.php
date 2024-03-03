<?php
require 'vendor/autoload.php';

$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);

header('Content-Type: text/event-stream');
header('Connection: keep-alive');
header('Cache-Control: no-store');

header('Access-Control-Allow-Origin: *');

$pubsub = $redisClient->pubSubLoop();
$pubsub->subscribe('message_update');

foreach ($pubsub as $message) {
    // Switch can be used here, if you prefer
    // in place of match
    $data = match ($message->kind) {
        'subscribe' => "Subscribed to {$message->channel}\n",
        'message' => date('Y-m-d H:i:s') . ": " . $message->payload,
    };

    echo "data: " . $data . "\n\n";

    ob_flush();
    flush();
}

$pubsub->unsubscribe('message_update');

$redisClient->disconnect();
