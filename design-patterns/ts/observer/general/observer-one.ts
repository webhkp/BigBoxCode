// observer-one.ts

import Observer from "./observer";
import Subject from "./subject";


class ObserverOne extends Observer {
    constructor(subject: Subject) {
        super();

        this.subject = subject;
        this.subject.attach(this);
    }

    sendUpdate(): void {
        console.log("Received in ObserverOne: " + this.subject?.getState());
    }
}

export default ObserverOne;