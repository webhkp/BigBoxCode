// demo.ts

import Colleague1 from "./colleague1";
import Colleague2 from "./colleague2";
import Colleague3 from "./colleague3";
import Mediator from "./mediator";

const mediator = new Mediator();

const colleague1 = new Colleague1(mediator);
const colleague2 = new Colleague2(mediator);
const colleague3 = new Colleague3(mediator);

colleague1.sendMessage(colleague2, "message from colleague1");
colleague1.sendMessage(colleague3, "message from colleague1");

colleague2.sendMessage(colleague3, "message from colleague2");

colleague3.sendMessage(colleague1, "message from colleague3");
