package com.bigboxcode.designpattern.builder.vechicle;

public interface VehicleBuilder {

    void addWheel(int noOfWheel);

    void addEngine(int noOfEngine);

    void addSeat(int noOfSeat);

    void addInterior();

    void addDoor(int noOfDoor);

    void addWing(int noOfWing) throws Exception;



}
