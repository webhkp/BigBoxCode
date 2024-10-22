from typing import Protocol, Optional


class Transport(Protocol):
    def start(self) -> None:
        """Start transport"""
        ...

    def stop(self) -> None:
        """Stop transport"""
        ...

    def repair(self) -> None:
        """Repair transport"""
        ...


class Bike:
    def start(self) -> None:
        print("Bike started")

    def stop(self) -> None:
        print("Bike stopped")

    def repair(self) -> None:
        print("Bike repair")


class Car:
    def start(self) -> None:
        print("Car started")

    def stop(self) -> None:
        print("Car stopped")

    def repair(self) -> None:
        print("Car repair")


class Plane:
    def start(self) -> None:
        print("Plane started")

    def stop(self) -> None:
        print("Plane stopped")

    def repair(self) -> None:
        print("Plane repair")


class TransportFactory:
    @staticmethod
    def get_transport(transport_type: str) -> Optional[Transport]:
        transport_type = transport_type.lower()
        if transport_type == "bike":
            return Bike()

        if transport_type == "car":
            return Car()

        if transport_type == "plane":
            return Plane()

        return None


# Demo usage
def main() -> None:
    transport_factory = TransportFactory()

    # Get Bike and start it
    transport1 = transport_factory.get_transport("bike")
    if transport1:
        transport1.start()
        transport1.stop()

    # Get Car and start it
    transport2 = transport_factory.get_transport("car")
    if transport2:
        transport2.start()

    # Get Plane and start it
    transport3 = transport_factory.get_transport("plane")
    if transport3:
        transport3.start()
        transport3.stop()
        transport3.repair()


if __name__ == "__main__":
    main()
