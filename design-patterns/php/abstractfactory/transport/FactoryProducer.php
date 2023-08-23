<?php
// FactoryProducer.php

namespace BigBoxCode\DesignPattern\AbstractFactory\Transport;

class FactoryProducer {
    public static function getFactory(int $numberOfWheels): ?AbstractTransportFactory {
        switch ($numberOfWheels) {
            case 2:
                return new TwoWheelTransportFactory();
            case 4:
                return new FourWheelTransportFactory();
        }

        return null;
    }
}