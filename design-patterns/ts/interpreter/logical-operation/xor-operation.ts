// xor-operation.ts

import Operation from "./operation";

class XorOperation implements Operation {
    private op1: Operation;
    private op2: Operation;

    constructor(op1: Operation, op2: Operation) {
        this.op1 = op1;
        this.op2 = op2;
    }

    execute(opContext: string): boolean {
        return this.op1.execute(opContext) != this.op2.execute(opContext);
    }
}

export default XorOperation;