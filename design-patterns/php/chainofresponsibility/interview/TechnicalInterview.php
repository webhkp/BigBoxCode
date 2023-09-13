<?php
// TechnicalInterview.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Interview;


class TechnicalInterview extends Interview {
    public function __construct(?Interview $nextInterview) {
        parent::__construct($nextInterview);
    }

    public function execute(): void {
        // Ask all questions for technical interview
        // Perform any other action required for technical interview
        echo "Ask technical interview questions\n";

        // Execute the next interview set while creating new struct
        if ($this->nextInterview) {
            $this->nextInterview->execute();
        }
    }

}