<?php
// DbConnSingleton.php

namespace Singleton\DbConnection;

class DbConnSingleton {
    private static ?DbConnSingleton $singletonInstance = null;

    private function __construct(
        private string $host,
        private int $port,
        private string $username,
        private string $password
    ) {
    }

    public static function getInstance(string $host, int $port, string $username, string $password): DbConnSingleton {
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
        echo "\nExecuting query: " . $query;
    }
}