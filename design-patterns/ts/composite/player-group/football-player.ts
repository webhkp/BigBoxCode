// football-player.ts

import Player from "./player";

class FootballPlayer implements Player {
    private name: string;
    private age: number;
    private goal: number;
    constructor(name: string, age: number, goal: number) {
        this.name = name;
        this.age = age;
        this.goal = goal;
    }

    printDetails() {
        console.log("Game: Football");
        console.log("Name: " + this.name);
        console.log("Age: " + this.age);
        console.log("Goals: " + this.goal);
    }
}

export default FootballPlayer;