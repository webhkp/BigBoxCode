from abc import ABC, abstractmethod
from typing import List


# Transport Interface
class Transport(ABC):
    @abstractmethod
    def start(self) -> None:
        pass

    @abstractmethod
    def operate(self) -> None:
        pass

    @abstractmethod
    def stop(self) -> None:
        pass


# Bike Class
class Bike(Transport):
    def start(self) -> None:
        print("Starting Bike...")

    def operate(self) -> None:
        print("Riding Bike")

    def stop(self) -> None:
        print("Stopping Bike...")


# Plane Class
class Plane(Transport):
    def start(self) -> None:
        print("Starting Plane...")

    def operate(self) -> None:
        print("Flying Plane")

    def stop(self) -> None:
        print("Stopping Plane...")


# Car Class
class Car(Transport):
    def start(self) -> None:
        print("Starting Car...")

    def operate(self) -> None:
        print("Driving Car")

    def stop(self) -> None:
        print("Stopping Car...")


# TransportGroup Class
class TransportGroup(Transport):
    def __init__(self):
        self._transport_list: List[Transport] = []

    def start(self) -> None:
        for transport in self._transport_list:
            transport.start()

    def operate(self) -> None:
        for transport in self._transport_list:
            transport.operate()

    def stop(self) -> None:
        for transport in self._transport_list:
            transport.stop()

    def add_transport(self, transport: Transport) -> None:
        self._transport_list.append(transport)

    def remove_transport(self, transport: Transport) -> None:
        if transport in self._transport_list:
            self._transport_list.remove(transport)


# Demo usage
def main():
    # Instantiate transport objects
    bike = Bike()
    plane = Plane()
    car = Car()
    second_car = Car()

    # Create a transport group
    transports = TransportGroup()
    transports.add_transport(bike)
    transports.add_transport(plane)
    transports.add_transport(car)
    transports.add_transport(second_car)

    print("-----------------Output with 4 transports------------------")
    transports.start()
    transports.operate()
    transports.stop()

    print("\n-----------------Output when plane is removed------------------")
    transports.remove_transport(plane)
    transports.start()
    transports.operate()
    transports.stop()


if __name__ == "__main__":
    main()
