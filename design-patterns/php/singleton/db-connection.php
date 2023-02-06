<?php

class DbConnSingleton {
    private static $singletonInstance;
    private $host;
    private $port;
    private $username;
    private $password;

    private function __construct($host, $port, $username, $password) {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
    }

    public static function getInstance($host, $port, $username, $password) {
        if (self::$singletonInstance) {
            echo "\nUsing existing db connection instance";
            return self::$singletonInstance;
        }

        echo "\nCreating new db connection instance";
        self::$singletonInstance = new DbConnSingleton($host, $port, $username, $password);

        return self::$singletonInstance;
    }

    public function printConnectionDetails() {
        echo "\nhost:" . $this->host;
        echo "\nport:" . $this->port;
        echo "\nusername:" . $this->username;
        echo "\npassword:" . $this->password;
    }
    public function executeQuery($query) {
        echo "\nExecuting query: " . query;
    }

}

$dbConnOne = DbConnSingleton::getInstance('loclahost', 1234, 'root', 'secret!pass');

echo "\nDB connection details for dbConnOne:";
$dbConnOne->printConnectionDetails();

$dbConnTwo = DbConnSingleton::getInstance('192.168.55.55', 2222, 'root2', 'secret!pass2');

echo "\nDB connection details for dbConnTwo:";
$dbConnTwo->printConnectionDetails();