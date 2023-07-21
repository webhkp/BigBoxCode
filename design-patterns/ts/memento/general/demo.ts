// demo.ts

import Caretaker from "./caretaker";
import Originator from "./originator";


const caretaker = new Caretaker();
const originator = new Originator();

originator.setState("Time - 1 : " + Date.now());
caretaker.add(originator.setMemento());

// Add delay if required for testing

originator.setState("Time - 2 : " + Date.now());
caretaker.add(originator.setMemento());

// Add delay if required for testing

originator.setState("Time - 3 : " + Date.now());
caretaker.add(originator.setMemento());

console.log("---------------------------------------------");

console.log("Check state at index 1 (index starts at 0):");

const stateAtIndex1 = caretaker.getByIndex(1);
console.log(stateAtIndex1.getState());

console.log("---------------------------------------------");

console.log("Check last state:");

const lastState = caretaker.getCurrent();
console.log(lastState.getState());

console.log("---------------------------------------------");

console.log("Undoing last state");

caretaker.undo();

console.log("---------------------------------------------");

console.log("Check last state after undo:");

const lastStateAfterUndo = caretaker.getCurrent();
console.log(lastStateAfterUndo.getState());

