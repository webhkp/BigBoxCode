// ui-control.ts

import UiCommand from "./ui-command";

class UiControl {
    private commandList: UiCommand[] = [];

    public addElement(command: UiCommand) {
        command.print();

        this.commandList.push(command);
    }

    public removeElement(command: UiCommand) {
        command.remove();

        for (let i = 0; i < this.commandList.length; i++) {
            if (command == this.commandList[i]) {
                this.commandList.splice(i, 1);
                break;
            }
        }
    }

    public undo() {
        const lastCommand = this.commandList[this.commandList.length - 1];
        this.removeElement(lastCommand);
    }
}

export default UiControl;