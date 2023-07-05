// terminal-operation.ts

import Operation from "./operation";

class TerminalOperation implements Operation {
    private data: string;

    constructor(data: string) {
        this.data = data;
    }

    execute(opContext: string): boolean {
        return opContext.includes(this.data);
    }
}

export default TerminalOperation;