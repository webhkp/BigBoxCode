package com.bigboxcode.designpattern.interpreter.booleanoperation;

public class TerminalOperation implements Operation {

    private String data;

    public TerminalOperation(String data) {
        this.data = data;
    }

    @Override
    public boolean execute(String opContext) {
        return opContext.contains(data);
    }
}
