from abc import ABC, abstractmethod


# Car item class
class Car:
    def __init__(self):
        self._wheel = 0
        self._engine = 0
        self._seat = 0
        self._door = 0
        self._interior = False

    @property
    def wheel(self) -> int:
        return self._wheel

    @property
    def engine(self) -> int:
        return self._engine

    @property
    def seat(self) -> int:
        return self._seat

    @property
    def door(self) -> int:
        return self._door

    @property
    def interior(self) -> bool:
        return self._interior

    def __str__(self) -> str:
        return (
            f"Car: Wheel -> {self._wheel} | Engine -> {self._engine} | "
            f"Seat -> {self._seat} | Door -> {self._door} | Interior -> {str(self._interior).lower()}"
        )


# Plane item class
class Plane:
    def __init__(self):
        self._wheel = 0
        self._engine = 0
        self._seat = 0
        self._door = 0
        self._wing = 0
        self._interior = False

    @property
    def wheel(self) -> int:
        return self._wheel

    @property
    def engine(self) -> int:
        return self._engine

    @property
    def seat(self) -> int:
        return self._seat

    @property
    def door(self) -> int:
        return self._door

    @property
    def wing(self) -> int:
        return self._wing

    @property
    def interior(self) -> bool:
        return self._interior

    def __str__(self) -> str:
        return (
            f"Plane: Wheel -> {self._wheel} | Engine -> {self._engine} | "
            f"Seat -> {self._seat} | Door -> {self._door} | Wing -> {self._wing} | "
            f"Interior -> {str(self._interior).lower()}"
        )


# Abstract vehichle builder
class VehicleBuilder(ABC):
    @abstractmethod
    def add_wheel(self, no_of_wheel: int) -> None:
        pass

    @abstractmethod
    def add_engine(self, no_of_engine: int) -> None:
        pass

    @abstractmethod
    def add_seat(self, no_of_seat: int) -> None:
        pass

    @abstractmethod
    def add_interior(self) -> None:
        pass

    @abstractmethod
    def add_door(self, no_of_door: int) -> None:
        pass

    @abstractmethod
    def add_wing(self, no_of_wing: int) -> None:
        pass


# Car builder
class CarBuilder(VehicleBuilder):
    def __init__(self):
        self.vehicle = Car()  # Create a Car object

    def add_wheel(self, no_of_wheel: int) -> None:
        print(f"Add {no_of_wheel} wheels")
        self.vehicle._wheel += no_of_wheel  # Update the vehicle object

    def add_engine(self, no_of_engine: int) -> None:
        print(f"Add {no_of_engine} engine")
        self.vehicle._engine += no_of_engine  # Update the vehicle object

    def add_seat(self, no_of_seat: int) -> None:
        print(f"Add {no_of_seat} Seat")
        self.vehicle._seat = no_of_seat  # Update the vehicle object

    def add_interior(self) -> None:
        print("Add interior")
        self.vehicle._interior = True  # Update the vehicle object

    def add_door(self, no_of_door: int) -> None:
        print(f"Add {no_of_door} door")
        self.vehicle._door += no_of_door  # Update the vehicle object

    def add_wing(self, no_of_wing: int) -> None:
        raise Exception("Cannot add wings")

    def build(self) -> Car:
        return self.vehicle  # Return the built Car object


# Plane builder
class PlaneBuilder(VehicleBuilder):
    def __init__(self):
        self.vehicle = Plane()  # Create a Plane object

    def add_wheel(self, no_of_wheel: int) -> None:
        print(f"Add {no_of_wheel} wheels")
        self.vehicle._wheel += no_of_wheel  # Update the vehicle object

    def add_engine(self, no_of_engine: int) -> None:
        print(f"Add {no_of_engine} engine")
        self.vehicle._engine += no_of_engine  # Update the vehicle object

    def add_seat(self, no_of_seat: int) -> None:
        print(f"Add {no_of_seat} Seat")
        self.vehicle._seat = no_of_seat  # Update the vehicle object

    def add_interior(self) -> None:
        print("Add interior")
        self.vehicle._interior = True  # Update the vehicle object

    def add_door(self, no_of_door: int) -> None:
        print(f"Add {no_of_door} door")
        self.vehicle._door += no_of_door  # Update the vehicle object

    def add_wing(self, no_of_wing: int) -> None:
        print(f"Add {no_of_wing} wing")
        self.vehicle._wing += no_of_wing  # Update the vehicle object

    def build(self) -> Plane:
        return self.vehicle  # Return the built Plane object


# Producer
class VehicleProducer:
    def build_car(self, car_builder: CarBuilder) -> CarBuilder:
        car_builder.add_wheel(4)
        car_builder.add_engine(1)
        car_builder.add_door(4)
        car_builder.add_seat(4)
        car_builder.add_interior()
        return car_builder

    def build_plane(self, plane_builder: PlaneBuilder) -> PlaneBuilder:
        plane_builder.add_wheel(3)
        plane_builder.add_engine(2)
        plane_builder.add_door(4)
        plane_builder.add_seat(120)
        plane_builder.add_interior()

        try:
            plane_builder.add_wing(2)
        except Exception as e:
            raise RuntimeError(e)

        return plane_builder


# Demo usage
def main():
    vehicle_producer = VehicleProducer()

    print("Building Car:")

    car_builder = CarBuilder()
    vehicle_producer.build_car(car_builder)

    car = car_builder.build()
    print(f"\nFinal result:\n{car}")

    print("\nBuilding Plane:")

    plane_builder = PlaneBuilder()
    vehicle_producer.build_plane(plane_builder)

    plane = plane_builder.build()
    print(f"\nFinal result:\n{plane}")


if __name__ == "__main__":
    main()
