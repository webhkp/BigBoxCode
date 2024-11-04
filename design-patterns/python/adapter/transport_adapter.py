from abc import ABC, abstractmethod


# AirTransport Interface
class AirTransport(ABC):
    @abstractmethod
    def get_number_of_wheels(self) -> int:
        pass

    @abstractmethod
    def get_number_of_engines(self) -> int:
        pass

    @abstractmethod
    def get_weight(self) -> float:
        pass

    @abstractmethod
    def get_distance_travelled(self) -> float:
        pass

    @abstractmethod
    def get_travel_cost_total(self) -> float:
        pass


# Plane Class
class Plane(AirTransport):
    def get_number_of_wheels(self) -> int:
        return 3

    def get_number_of_engines(self) -> int:
        return 2

    def get_weight(self) -> float:
        return 127_000

    def get_distance_travelled(self) -> float:
        return 500

    def get_travel_cost_total(self) -> float:
        return 3_000


# Helicopter Class
class Helicopter(AirTransport):
    def get_number_of_wheels(self) -> int:
        return 0

    def get_number_of_engines(self) -> int:
        return 1

    def get_weight(self) -> float:
        return 12_000

    def get_distance_travelled(self) -> float:
        return 180

    def get_travel_cost_total(self) -> float:
        return 20_000


# Transport Interface
class Transport(ABC):
    @abstractmethod
    def get_number_of_wheels(self) -> int:
        pass

    @abstractmethod
    def get_weight(self) -> float:
        pass

    @abstractmethod
    def get_distance_travelled(self) -> float:
        pass

    @abstractmethod
    def get_travel_cost_per_mile(self) -> float:
        pass


# Bus Class
class Bus(Transport):
    def get_number_of_wheels(self) -> int:
        return 4

    def get_weight(self) -> float:
        return 10_000

    def get_distance_travelled(self) -> float:
        return 1_000

    def get_travel_cost_per_mile(self) -> float:
        return 5


# Bike Class
class Bike(Transport):
    def get_number_of_wheels(self) -> int:
        return 2

    def get_weight(self) -> float:
        return 700

    def get_distance_travelled(self) -> float:
        return 80

    def get_travel_cost_per_mile(self) -> float:
        return 4


# AirTransportAdapter Class
class AirTransportAdapter(Transport):
    def __init__(self, air_transport: AirTransport):
        self.air_transport = air_transport

    def get_number_of_wheels(self) -> int:
        return self.air_transport.get_number_of_wheels()

    def get_weight(self) -> float:
        return self.air_transport.get_weight()

    def get_distance_travelled(self) -> float:
        # Convert nautical miles to miles
        distance_in_nautical_mile = self.air_transport.get_distance_travelled()
        return distance_in_nautical_mile * 1.151

    def get_travel_cost_per_mile(self) -> float:
        total_cost = self.air_transport.get_travel_cost_total()
        return total_cost / self.get_distance_travelled()


# Demo Usage
def main():
    print("Get information of Bus travel...")

    bus = Bus()
    print(f"Number of wheels: {bus.get_number_of_wheels()}")
    print(f"Weight (kg): {bus.get_weight()}")
    print(f"Distance (miles): {bus.get_distance_travelled()}")
    print(f"Cost per mile: {bus.get_travel_cost_per_mile()}")

    print("\nGet information of Plane travel...")

    plane_transport = AirTransportAdapter(Plane())
    print(f"Number of wheels: {plane_transport.get_number_of_wheels()}")
    print(f"Weight (kg): {plane_transport.get_weight()}")
    print(f"Distance (miles): {plane_transport.get_distance_travelled()}")
    print(f"Cost per mile: {plane_transport.get_travel_cost_per_mile()}")


if __name__ == "__main__":
    main()
