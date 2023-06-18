// demo.ts

import BackgroundDecorator from "./background-decorator";
import BorderDecorator from "./border-decorator";
import Button from "./button";
import InputBox from "./input-box";
import MarginDecorator from "./margin-decorator";
import Table from "./table";

const tableWithBorder = new BorderDecorator(new Table());
tableWithBorder.draw();

const inputWithBorderAndBackground = new BackgroundDecorator(new BorderDecorator(new InputBox()));
inputWithBorderAndBackground.draw();

const buttonWithAllDecorator = new MarginDecorator(new BackgroundDecorator(new BorderDecorator(new Button())));
buttonWithAllDecorator.draw();
