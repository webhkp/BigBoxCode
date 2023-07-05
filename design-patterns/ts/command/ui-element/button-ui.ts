// button-ui.ts

import UiCommand from "./ui-command";

class ButtonUi implements UiCommand {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public print() {
        console.log("Printing " + this.name + " Button");
    }
    public remove() {
        console.log("Removing " + this.name + "  Button");
    }
}

export default ButtonUi;