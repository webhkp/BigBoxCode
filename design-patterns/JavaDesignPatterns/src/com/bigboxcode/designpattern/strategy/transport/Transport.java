package com.bigboxcode.designpattern.strategy.transport;

public interface Transport {
    void start();

    void stop();

    void repair();

    void getInfo();

    void operate();
}
