from abc import ABC, abstractmethod


class Transport(ABC):
    @abstractmethod
    def start(self) -> None:
        pass

    @abstractmethod
    def stop(self) -> None:
        pass

    @abstractmethod
    def repair(self) -> None:
        pass


class Bus(Transport):
    def start(self) -> None:
        print("Bus started")

    def stop(self) -> None:
        print("Bus stopped")

    def repair(self) -> None:
        print("Bus repair")


class Bike(Transport):
    def start(self) -> None:
        print("Bike started")

    def stop(self) -> None:
        print("Bike stopped")

    def repair(self) -> None:
        print("Bike repair")


class Car(Transport):
    def start(self) -> None:
        print("Car started")

    def stop(self) -> None:
        print("Car stopped")

    def repair(self) -> None:
        print("Car repair")


class Plane(Transport):
    def start(self) -> None:
        print("Plane started")

    def stop(self) -> None:
        print("Plane stopped")

    def repair(self) -> None:
        print("Plane repair")


class Helicopter(Transport):
    def start(self) -> None:
        print("Helicopter started")

    def stop(self) -> None:
        print("Helicopter stopped")

    def repair(self) -> None:
        print("Helicopter repair")


class TransportFactory(ABC):
    def operate_transport(self, name: str) -> None:
        transport = self.get_transport(name)
        if transport:
            transport.start()
            transport.stop()

    def repair_transport(self, name: str) -> None:
        transport = self.get_transport(name)
        if transport:
            transport.repair()

    @abstractmethod
    def get_transport(self, name: str) -> Transport:
        pass


class RoadTransportFactory(TransportFactory):
    def get_transport(self, name: str) -> Transport:
        if name.lower() == "car":
            return Car()

        if name.lower() == "bike":
            return Bike()

        if name.lower() == "bus":
            return Bus()

        return None


class AirTransportFactory(TransportFactory):
    def get_transport(self, name: str) -> Transport:
        if name.lower() == "plane":
            return Plane()

        if name.lower() == "helicopter":
            return Helicopter()

        return None


def main():
    # Create instances of both factories
    road_factory = RoadTransportFactory()
    air_factory = AirTransportFactory()

    # Operate and repair various transports
    road_factory.operate_transport("bus")
    air_factory.operate_transport("helicopter")
    road_factory.repair_transport("bike")


if __name__ == "__main__":
    main()
