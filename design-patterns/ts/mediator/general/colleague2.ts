// colleague2.ts

import Colleague from "./colleague";
import Mediator from "./mediator";


class Colleague2 extends Colleague {
    constructor(mediator: Mediator) {
        super(mediator);
    }

    sendMessage(colleague: Colleague, msg: string): void {
        this.mediator.sendMessage(colleague, msg);
    }

    receiveMessage(msg: string): void {
        console.log("Message received in Colleague2: " + msg);
    }
}

export default Colleague2;