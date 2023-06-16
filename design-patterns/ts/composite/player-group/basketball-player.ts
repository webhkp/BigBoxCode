// basketball-player.ts

import Player from "./player";

class BasketballPlayer implements Player {
    private name: string;
    private age: number;
    private point: number;

    constructor(name: string, age: number, point: number) {
        this.name = name;
        this.age = age;
        this.point = point;
    }

    printDetails(): void {
        console.log("Game: Basketball");
        console.log("Name: " + this.name);
        console.log("Age: " + this.age);
        console.log("Points: " + this.point);
    }
}

export default BasketballPlayer;