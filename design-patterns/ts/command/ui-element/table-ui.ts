// table-ui.ts

import UiCommand from "./ui-command";

class TableUi implements UiCommand {
    public print() {
        console.log("Printing Table");
    }
    public remove() {
        console.log("Removing Table");
    }
}

export default TableUi;