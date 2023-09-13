<?php
// CeoInterview.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Interview;


class CeoInterview extends Interview {
    public function __construct(?Interview $nextInterview) {
        parent::__construct($nextInterview);
    }

    public function execute(): void {
        // Ask all questions for ceo interview
        // Perform any other action required for ceo interview
        echo "Ask CEO interview questions\n";

        // Execute the next interview set while creating new struct
        if ($this->nextInterview) {
            $this->nextInterview->execute();
        }
    }

}