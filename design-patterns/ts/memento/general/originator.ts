// originator.ts

import Memento from "./memento";

class Originator {
    private state: string = '';
    
    public setState(state: string): void {
        this.state = state;
    }

    public getState(): string {
        return this.state;
    }

    public setMemento(): Memento {
        console.log("Memento Saved with timestamp => " + this.state);
        return new Memento(this.state);
    }

    public getMementoState(memento: Memento): void {
        this.state = memento.getState();
    }
}

export default Originator;