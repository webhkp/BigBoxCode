// subject.ts

import Observer from "./observer";

interface Subject {
    getState(): number;
    setState(state: number): void;
    attach(observer: Observer): void;
    notifyObservers(): void;
}

export default Subject;