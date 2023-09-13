<?php
// PhoneInterview.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Interview;


class PhoneInterview extends Interview {
    public function __construct(?Interview $nextInterview) {
        parent::__construct($nextInterview);
    }

    public function execute(): void {
        // Ask all questions for phone interview
        // Perform any other action required for phone interview
        echo "Ask phone interview questions\n";

        // Execute the next interview set while creating new struct
        if ($this->nextInterview) {
            $this->nextInterview->execute();
        }
    }

}