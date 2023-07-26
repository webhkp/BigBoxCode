// concrete-subject.ts

import Observer from "./observer";
import Subject from "./subject";

class ConcreteSubject implements Subject {
    private state: number = 0;
    private observerList: Observer[] = [];

    getState(): number {
        return this.state;
    }

    setState(state: number): void {
        this.state = state;
        this.notifyObservers();
    }

    public attach(observer: Observer): void {
        this.observerList.push(observer);
    }

    public notifyObservers(): void {
        for (let observer of this.observerList) {
            observer.sendUpdate()
        }
    }
}

export default ConcreteSubject;