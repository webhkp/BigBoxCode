// car.ts

class Car {
    startEngine(): void {
        console.log("Start Engine");
    }

    stopEngine(): void {
        console.log("Stop Engine");
    }

    goStraight(): void {
        console.log("Go Straight: ↑");
    }

    goLeft(): void {
        console.log("Go Left: ←");
    }

    goRight(): void {
        console.log("Go Right: →");
    }

    getDistanceTravelled(): number {
        // This is some random calculation for demo purpose
        return ((Math.random() * ((10000 - 100) * 10 + 1)) + 100 * 10) / 10.0;
    }
}

export default Car;