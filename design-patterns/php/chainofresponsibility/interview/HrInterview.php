<?php
// HrInterview.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Interview;

class HrInterview extends Interview {
    public function __construct(?Interview $nextInterview) {
        parent::__construct($nextInterview);
    }

    public function execute(): void {
        // Ask all questions for hr interview
        // Perform any other action required for hr interview
        echo "Ask HR interview questions\n";

        // Execute the next interview set while creating new struct
        if ($this->nextInterview) {
            $this->nextInterview->execute();
        }
    }

}