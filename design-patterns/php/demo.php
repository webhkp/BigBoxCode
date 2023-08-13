<?php
// Singleton pattern implementation in PHP

class Singleton {
    // Make sure to make the "private" and "static"
    private static ?Singleton $singletonInstance = null;

    // Make sure to make the constructor "private"
    private function __construct(private string $someVal) {

    }

    // Make sure to make the function "static"
    public static function getInstance(string $someVal): Singleton {
        // Check if an instance already exists
        if (!self::$singletonInstance) {
            // If instance does not exist then create an instance
            // and assign that to "singletonInstance"
            self::$singletonInstance = new Singleton($someVal);
        }

        // Return the "singletonInstance"
        return self::$singletonInstance;
    }

    public function printDetails() {
        echo "\nsome val: " . $this->someVal;
    }
}


// Use the singleton implementatin like below
$mySingletonInstance = Singleton::getInstance("val abc");
$mySingletonInstance->printDetails();


// Try using another instance
$anotherInstance = Singleton::getInstance("changed val");
$anotherInstance->printDetails();

// New instance can not be created using the "new" keyword
// as the constructor is declared as "private".
// An attempt like below will generate error
// const someSingletonInstance = new Singleton(); 