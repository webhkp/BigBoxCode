// vehicle-producer.ts

import CarBuilder from "./car-builder";
import PlaneBuilder from "./plane-builder";

class VehicleProducer {
    buildCar(carBuilder: CarBuilder): CarBuilder {
        carBuilder.addWheel(4);
        carBuilder.addEngine(1);
        carBuilder.addDoor(4);
        carBuilder.addSeat(4);
        carBuilder.addInterior();

        return carBuilder;
    }

    buildPlane(planeBuilder: PlaneBuilder): PlaneBuilder {
        planeBuilder.addWheel(3);
        planeBuilder.addEngine(2);
        planeBuilder.addDoor(4);
        planeBuilder.addSeat(120);
        planeBuilder.addInterior();
        planeBuilder.addWing(2);
        
        return planeBuilder;
    }
}

export default VehicleProducer;