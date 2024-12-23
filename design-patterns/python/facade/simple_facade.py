# First subsystem
class Subsystem1:
    def operation1(self):
        print("Subsystem 1: operation 1")

    def operation2(self):
        print("Subsystem 1: operation 2")


# Second subsystem
class Subsystem2:
    def operation3(self):
        print("Subsystem 2: operation 3")

    def operation4(self):
        print("Subsystem 2: operation 4")


# Third subsystem
class Subsystem3:
    def operation5(self):
        print("Subsystem 3: operation 5")


# Facade
class Facade:
    def __init__(self):
        # Initialize subsystems
        self.subsystem1 = Subsystem1()
        self.subsystem2 = Subsystem2()
        self.subsystem3 = Subsystem3()

    def exampleOp1(self):
        # Use operation from subsystem as required
        self.subsystem1.operation1()
        self.subsystem2.operation3()

    def exampleOp2(self):
        # Use operation from subsystem as required
        self.subsystem1.operation2()
        self.subsystem3.operation5()


# Demo usage
if __name__ == "__main__":
    facade = Facade()

    facade.exampleOp1()
    facade.exampleOp2()
