<?php
require 'vendor/autoload.php';

$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host'   => 'localhost',
    'port'   => 6379
]);

$message = $_POST['message'] ?? null;
$success = false;

if ($message) {
    try {
        $redisClient->publish('message_update', $message);
        $success = true;
    } catch (\Exception $e) {
        $message = $e->getMessage();
    }
}

header("Content-Type: application/json");
echo json_encode(['success' => $success, 'message' => $message]);
exit();
