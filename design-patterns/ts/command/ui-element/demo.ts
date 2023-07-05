// demo.ts

import ButtonUi from "./button-ui";
import InputUi from "./input-ui";
import TableUi from "./table-ui";
import UiControl from "./ui-control";

const uiControl = new UiControl();

const inputUi = new InputUi();
const tableUi = new TableUi();
const buttonUi = new ButtonUi("Submit");

uiControl.addElement(inputUi);
uiControl.addElement(tableUi);
uiControl.addElement(buttonUi);
uiControl.removeElement(tableUi);

uiControl.addElement(new ButtonUi("Cancel"));
uiControl.addElement(new TableUi());
uiControl.addElement(new InputUi());
uiControl.addElement(new ButtonUi("Wrong button"));

uiControl.undo();
uiControl.undo();
