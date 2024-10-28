import copy


class Plane:
    def __init__(
        self,
        name: str,
        manufacturer: str,
        model: str,
        length: float,
        height: float,
        wingspan: float,
        seat: float,
        engine: "PlaneEngine",
    ):
        self.name = name
        self.manufacturer = manufacturer
        self.model = model
        self.length = length
        self.height = height
        self.wingspan = wingspan
        self.seat = seat
        self.engine = engine

    # Other methods for plane function

    def clone(self):
        return copy.deepcopy(self)

    def __repr__(self):
        return (
            f"Plane(name={self.name}, manufacturer={self.manufacturer}, model={self.model}, "
            f"length={self.length}, height={self.height}, wingspan={self.wingspan}, "
            f"seat={self.seat}, engine={self.engine})"
        )


class PlaneEngine:
    def __init__(
        self, name: str, length: float, weight: float, no_of_blade: int, rpm: int
    ):
        self.name = name
        self.length = length
        self.weight = weight
        self.no_of_blade = no_of_blade
        self.rpm = rpm

    # Other methods for engine functions

    def __str__(self):
        return (
            f"PlaneEngine(name={self.name}, length={self.length}, weight={self.weight}, "
            f"no_of_blade={self.no_of_blade}, rpm={self.rpm})"
        )


# Demo usage
def main():
    # Prepare the engine object
    plane_engine = PlaneEngine(
        name="GE9X", length=220.0, weight=22000.0, no_of_blade=16, rpm=2510
    )

    # Create a plane object
    plane = Plane(
        name="Boeing 777",
        manufacturer="Boeing",
        model="777-200LR",
        length=63.7,
        height=18.6,
        wingspan=64.8,
        seat=317,
        engine=plane_engine,
    )

    # Print details of the original plane
    print("Original Plane object:", plane)

    # Clone the Plane object
    clone_plane = plane.clone()

    # Print details just after cloning
    print("Clone Plane object:", clone_plane)

    # Change some values in the cloned plane
    clone_plane.model = "777-300ER"
    clone_plane.engine.name = "GE10YYYY"

    # Print details of the cloned plane after changes
    print("Clone Plane object after change:", clone_plane)

    # Check the original Plane object to ensure it's unchanged
    print("Original Plane object after changes in the clone:", plane)


if __name__ == "__main__":
    main()
