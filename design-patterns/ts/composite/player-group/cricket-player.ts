// cricket-player.ts

import Player from "./player";

class CricketPlayer implements Player {
    private name: string;
    private age: number;
    private run: number;

    constructor(name: string, age: number, run: number) {
        this.name = name;
        this.age = age;
        this.run = run;
    }

    printDetails(): void {
        console.log("Game: Cricket");
        console.log("Name: " + this.name);
        console.log("Age: " + this.age);
        console.log("Runs: " + this.run);
    }
}

export default CricketPlayer;