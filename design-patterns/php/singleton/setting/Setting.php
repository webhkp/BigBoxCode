<?php
// setting.php

namespace Singleton\Setting;

class Setting {
    private static ?Setting $settingInstance = null;
    private $props = [];

    // Make sure to define a private constructor
    private function __construct() {
    }

    public static function getInstance(): Setting {
        if (empty(self::$settingInstance)) {
            self::$settingInstance = new Setting();
        }

        return self::$settingInstance;
    }

    public function set(string $key, mixed $value): void {
        $this->props[$key] = $value;
    }

    public function get(string $key): mixed {
        if (isset($this->props[$key])) {
            return $this->props[$key];
        }

        return null;
    }

    public function getAll() {
        return $this->props;
    }
}