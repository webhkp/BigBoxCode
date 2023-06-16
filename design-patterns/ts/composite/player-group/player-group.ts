// player-group.ts

import Player from "./player";

class PlayerGroup implements Player {
    private playerList: Player[] = [];

    printDetails(): void {
        for (let player of this.playerList) {
            player.printDetails();
        }
    }

    addElement(transport: Player): void {
        this.playerList.push(transport);
    }

    removeElement(transport: Player): void {
        this.playerList.splice(this.playerList.indexOf(transport), 1);
    }
}

export default PlayerGroup;