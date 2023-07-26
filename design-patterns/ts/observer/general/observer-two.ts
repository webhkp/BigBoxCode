// observer-two.ts

import Observer from "./observer";
import Subject from "./subject";

class ObserverTwo extends Observer {
    constructor(subject: Subject) {
        super();

        this.subject = subject;
        this.subject.attach(this);
    }

    sendUpdate(): void {
        console.log("Received in ObserverTwo: " + this.subject?.getState());
    }
}

export default ObserverTwo;