from typing import Protocol
from abc import ABC, abstractmethod


# Seat interface using Protocol
class Seat(Protocol):
    def select_seat(self) -> None:
        pass


# BusinessClassSeat class
class BusinessClassSeat(Seat):
    def select_seat(self) -> None:
        print("Select a Business class seat")


# EconomyClassSeat class
class EconomyClassSeat(Seat):
    def select_seat(self) -> None:
        print("Select an Economy class seat")


# Transport abstract class
class Transport(ABC):
    def __init__(self, seat: Seat) -> None:
        self.seat = seat

    @abstractmethod
    def select_transport(self) -> None:
        pass


# Plane class
class Plane(Transport):
    def select_transport(self) -> None:
        print("Plane selected for transport")
        self.seat.select_seat()


# Train class
class Train(Transport):
    def select_transport(self) -> None:
        print("Train selected for transport")
        self.seat.select_seat()


# Demo usage
def main():
    plane = Plane(BusinessClassSeat())
    plane.select_transport()

    plane2 = Plane(EconomyClassSeat())
    plane2.select_transport()

    train = Train(EconomyClassSeat())
    train.select_transport()


if __name__ == "__main__":
    main()
