// mediator.ts

import Colleague from "./colleague";

interface IMediator {
    sendMessage(colleague: Colleague, msg: string): void;
}

class Mediator implements IMediator {
    sendMessage(receiver: Colleague, msg: string): void {
        receiver.receiveMessage(msg);
    }
}

export default Mediator;