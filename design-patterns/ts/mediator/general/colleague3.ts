// colleague3.ts

import Colleague from "./colleague";
import Mediator from "./mediator";

class Colleague3 extends Colleague {
    constructor(mediator: Mediator) {
        super(mediator);
    }

    sendMessage(colleague: Colleague, msg: string): void {
        this.mediator.sendMessage(colleague, msg);
    }

    receiveMessage(msg: string): void {
        console.log("Message received in Colleague3: " + msg);
    }
}

export default Colleague3;