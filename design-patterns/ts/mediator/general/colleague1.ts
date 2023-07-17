// colleague1.ts

import Colleague from "./colleague";
import Mediator from "./mediator";

class Colleague1 extends Colleague {
    constructor(mediator: Mediator) {
        super(mediator);
    }

    sendMessage(colleague: Colleague, msg: string): void {
        this.mediator.sendMessage(colleague, msg);
    }

    receiveMessage(msg: string): void {
        console.log("Message received in Colleague1: " + msg);
    }
}

export default Colleague1;