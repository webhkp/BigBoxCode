// demo.ts

import ConcreteSubject from "./concrete-subject";
import ObserverOne from "./observer-one";
import ObserverTwo from "./observer-two";

var subject = new ConcreteSubject();
new ObserverOne(subject);
new ObserverTwo(subject);

console.log("Setting subject value to 10");
subject.setState(10);


console.log("Setting subject value to 999");
subject.setState(999);
