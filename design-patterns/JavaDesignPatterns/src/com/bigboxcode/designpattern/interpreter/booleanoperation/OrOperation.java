package com.bigboxcode.designpattern.interpreter.booleanoperation;

public class OrOperation implements Operation {

    private final Operation op1;
    private final Operation op2;

    public OrOperation(Operation op1, Operation op2) {
        this.op1 = op1;
        this.op2 = op2;
    }

    @Override
    public boolean execute(String opContext) {
        return op1.execute(opContext) || op2.execute(opContext);
    }
}
