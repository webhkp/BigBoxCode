import random


# Subsystem: Car
class Car:
    def start_engine(self):
        print("Start Engine")

    def stop_engine(self):
        print("Stop Engine")

    def go_straight(self):
        print("Go Straight: ↑")

    def go_left(self):
        print("Go Left: ←")

    def go_right(self):
        print("Go Right: →")

    def get_distance_travelled(self):
        # Random calculation for demo purposes
        return round(
            (random.randint(0, 180) * ((10000 - 100) * 10 + 1) + 100 * 10) / 10.0, 2
        )


# Subsystem: Point (for coordinates)
class Point:
    def __init__(self, lat: float, lng: float):
        self._lat = lat
        self._lng = lng

    # Getters and Setters for Latitude
    @property
    def lat(self):
        return self._lat

    @lat.setter
    def lat(self, value: float):
        self._lat = value

    @lat.deleter
    def lat(self):
        del self._lat

    # Getters and Setters for Longitude
    @property
    def lng(self):
        return self._lng

    @lng.setter
    def lng(self, value: float):
        self._lng = value

    @lng.deleter
    def lng(self):
        del self._lng


# Subsystem: Direction
class Direction:
    def __init__(
        self, start_lat: float, start_lng: float, end_lat: float, end_lng: float
    ):
        self._start_lat = start_lat
        self._start_lng = start_lng
        self._end_lat = end_lat
        self._end_lng = end_lng

    def get_location_details(self, lat: float, lng: float):
        print("Country: ABC")
        print("City: DEF")
        print("State: GHI")
        print("Zip: 101010")

    def get_current_location(self):
        # Random calculation for demo purposes
        current_lat = random.uniform(-90, 90)
        current_lng = random.uniform(-180, 180)
        return Point(current_lat, current_lng)

    def get_next_move(self):
        # Randomly choose the next move
        next_moves = ["straight", "left", "right"]
        return random.choice(next_moves)

    def get_full_route(self):
        points = []
        for _ in range(10):
            # Random calculation for demo purposes
            current_lat = random.uniform(-90, 90)
            current_lng = random.uniform(-180, 180)
            points.append(Point(current_lat, current_lng))
        return points


# Subsystem: Toll
class Toll:
    def get_toll_points(self, lat: float, lng: float):
        points = []
        for _ in range(10):
            current_lat = random.uniform(-90, 90)
            current_lng = random.uniform(-180, 180)
            points.append(Point(current_lat, current_lng))
        return points

    def get_toll_amount(self, toll_point_id: float):
        return random.uniform(0, 100)

    def get_total_toll(self, lat: float, lng: float):
        return random.uniform(0, 100)


# Subsystem: Weather
class Weather:
    def get_weather_info(self, lat: float, lng: float):
        print("Temperature: 20.7°C")
        print("Precipitation: 1%")
        print("Humidity: 73%")
        print("Wind: 8 km/h")


# Facade: TravelFacade
class TravelFacade:
    def __init__(
        self, start_lat: float, start_lng: float, end_lat: float, end_lng: float
    ):
        self._start_lat = start_lat
        self._start_lng = start_lng
        self._end_lat = end_lat
        self._end_lng = end_lng
        self._direction = Direction(start_lat, start_lng, end_lat, end_lng)
        self._car = Car()
        self._toll = Toll()
        self._weather = Weather()

    def get_route(self):
        return self._direction.get_full_route()

    def get_location_info(self, lat: float, lng: float):
        self._direction.get_location_details(lat, lng)
        self._weather.get_weather_info(lat, lng)

    def get_current_location(self):
        return self._direction.get_current_location()

    def operate_car(self):
        full_route = self._direction.get_full_route()
        self._car.start_engine()
        for point in full_route:
            next_move = self._direction.get_next_move()
            if next_move == "straight":
                self._car.go_straight()
            elif next_move == "left":
                self._car.go_left()
            elif next_move == "right":
                self._car.go_right()
        self._car.stop_engine()

    def get_total_toll_amount(self, lat: float, lng: float):
        print(f"Total Toll Amount: {self._toll.get_total_toll(lat, lng):.2f}")


# Demo: Using the Facade
if __name__ == "__main__":
    travel_facade = TravelFacade(10, 10, 20, 30)
    current_location = travel_facade.get_current_location()
    print(f"Current Latitude: {current_location.lat}")
    print(f"Current Longitude: {current_location.lng}")

    travel_facade.get_location_info(20, 30)
    travel_facade.get_total_toll_amount(20, 30)
    travel_facade.operate_car()
