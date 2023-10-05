<?php
// Service.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;

interface Service {
    public function accept(HostingCalculatorVisitor $hostingCalculatorVisitor): float;
}