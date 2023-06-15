// demo.ts

import Blue from "./blue";
import Button from "./button";
import Green from "./green";
import Input from "./input";
import Red from "./red";
import Table from "./table";

var table = new Table(new Red());
table.printElement();

var input = new Input(new Green());
input.printElement();

var button = new Button(new Blue());
button.printElement();

var button2 = new Button(new Red());
button2.printElement();
