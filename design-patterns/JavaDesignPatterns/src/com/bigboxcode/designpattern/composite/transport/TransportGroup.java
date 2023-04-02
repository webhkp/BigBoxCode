// TransportGroup.java

package com.bigboxcode.designpattern.composite.transport;

import java.util.ArrayList;
import java.util.List;

public class TransportGroup implements Transport {
    private List<Transport> transportList = new ArrayList<Transport>();

    @Override
    public void start() {
        for (Transport transport: transportList) {
            transport.start();
        }
    }

    @Override
    public void operate() {
        for (Transport transport: transportList) {
            transport.operate();
        }
    }

    @Override
    public void stop() {
        for (Transport transport: transportList) {
            transport.stop();
        }
    }

    public void addTransport(Transport transport) {
        transportList.add(transport);
    }

    public void removeTransport(Transport transport) {
        transportList.remove(transport);
    }
}
