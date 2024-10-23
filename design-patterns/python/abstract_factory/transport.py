from abc import ABC, abstractmethod
from typing import Optional


# Transport abstract class
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


# Bicycle class
class Bicycle(Transport):
    def start(self) -> None:
        print("Bicycle started")

    def stop(self) -> None:
        print("Bicycle stopped")

    def repair(self) -> None:
        print("Repairing Bicycle")


# Motorcycle class
class Motorcycle(Transport):
    def start(self) -> None:
        print("Motorcycle started")

    def stop(self) -> None:
        print("Motorcycle stopped")

    def repair(self) -> None:
        print("Repairing Motorcycle")


# Car class
class Car(Transport):
    def start(self) -> None:
        print("Car started")

    def stop(self) -> None:
        print("Car stopped")

    def repair(self) -> None:
        print("Repairing Car")


# Truck class
class Truck(Transport):
    def start(self) -> None:
        print("Truck started")

    def stop(self) -> None:
        print("Truck stopped")

    def repair(self) -> None:
        print("Repairing Truck")


# Abstract factory class
class TransportFactory(ABC):
    @abstractmethod
    def get_transport(self, transport_type: str) -> Optional[Transport]:
        pass


# Two wheeler factory
class TwoWheelerTransportFactory(TransportFactory):
    def get_transport(self, transport_type: str) -> Optional[Transport]:
        match transport_type:
            case "bicycle":
                return Bicycle()
            case "motorcycle":
                return Motorcycle()
            case _:
                return None


# Four wheeler factory
class FourWheelerTransportFactory(TransportFactory):
    def get_transport(self, transport_type: str) -> Optional[Transport]:
        match transport_type:
            case "car":
                return Car()
            case "truck":
                return Truck()
            case _:
                return None


# Factory producer
class FactoryProducer:
    @staticmethod
    def get_factory(number_of_wheels: int) -> Optional[TransportFactory]:
        match number_of_wheels:
            case 2:
                return TwoWheelerTransportFactory()
            case 4:
                return FourWheelerTransportFactory()
            case _:
                None


# Demo usage
def main() -> None:
    two_wheeler_transport_factory = FactoryProducer.get_factory(2)

    if two_wheeler_transport_factory is not None:
        first_transport = two_wheeler_transport_factory.get_transport("bicycle")

        if first_transport:
            first_transport.start()
            first_transport.stop()

    four_wheeler_transport_factory = FactoryProducer.get_factory(4)

    if four_wheeler_transport_factory is not None:
        second_transport = four_wheeler_transport_factory.get_transport("truck")

        if second_transport:
            second_transport.start()
            second_transport.stop()
            second_transport.repair()


if __name__ == "__main__":
    main()