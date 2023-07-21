// caretaker.ts

import Memento from "./memento";

class Caretaker {

    private mementoList: Memento[] = [];

    add(memento: Memento): void {
        this.mementoList.push(memento);
    }

    getByIndex(index: number): Memento {
        return this.mementoList[index];
    }

    getCurrent(): Memento {
        return this.mementoList[this.mementoList.length - 1];
    }

    undo(): void {
        this.mementoList.splice(-1, 1);
    }
}

export default Caretaker;