// colleague.ts

import Mediator from "./mediator";

abstract class Colleague {
    protected mediator: Mediator;
    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    abstract sendMessage(colleague: Colleague, message: string): void;
    abstract receiveMessage(message: string): void;
}

export default Colleague;