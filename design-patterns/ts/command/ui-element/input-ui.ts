// input-ui.ts

import UiCommand from "./ui-command";

class InputUi implements UiCommand {
    public print() {
        console.log("Printing Input");
    }
    public remove() {
        console.log("Removing Input");
    }
}

export default InputUi;