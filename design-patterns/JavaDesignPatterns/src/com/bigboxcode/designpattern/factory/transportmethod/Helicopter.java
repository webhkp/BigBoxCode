package com.bigboxcode.designpattern.factory.transportmethod;

public class Helicopter implements Transport {
        @Override
        public void start() {
            System.out.println("Helicopter started");
        }

        @Override
        public void stop() {
            System.out.println("Helicopter Stopped");
        }

        @Override
        public void repair() {
            System.out.println("Helicopter Repair");
        }
}
