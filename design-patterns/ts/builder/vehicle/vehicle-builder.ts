// vehicle-builder.ts

interface VehicleBuilder {
    addWheel(noOfWheel:number): void;
    addEngine(noOfEngine:number): void;
    addSeat(noOfSeat:number): void;
    addInterior(): void;
    addDoor(noOfDoor:number): void;
    addWing(noOfWing:number): void;
}

export default VehicleBuilder;