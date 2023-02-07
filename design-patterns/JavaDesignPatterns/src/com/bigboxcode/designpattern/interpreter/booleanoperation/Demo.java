package com.bigboxcode.designpattern.interpreter.booleanoperation;

public class Demo {
    public static void main(String[] args) {
        Operation op1 = new TerminalOperation("Big");
        Operation op2 = new TerminalOperation("Box");

        Operation andChecker = new AndOperation(op1, op2);
        Operation orChecker = new OrOperation(op1, op2);
        Operation xorChecker = new XorOperation(op1, op2);


        String checkStr1 = "Big Box Code";
        String checkStr2 = "Only Big Code";
        String checkStr3 = "Only Box Code";
        String checkStr4 = "No Code";


        boolean andResult1 = andChecker.execute(checkStr1);
        boolean andResult2 = andChecker.execute(checkStr2);
        boolean andResult3 = andChecker.execute(checkStr3);
        boolean andResult4 = andChecker.execute(checkStr4);

        System.out.println("Data: " + checkStr1 + "; AND Result: " + andResult1);
        System.out.println("Data: " + checkStr2 + "; AND Result: " + andResult2);
        System.out.println("Data: " + checkStr3 + "; AND Result: " + andResult3);
        System.out.println("Data: " + checkStr4 + "; AND Result: " + andResult4);

        System.out.println("\n----------------------------------------------\n");

        boolean orResult1 = orChecker.execute(checkStr1);
        boolean orResult2 = orChecker.execute(checkStr2);
        boolean orResult3 = orChecker.execute(checkStr3);
        boolean orResult4 = orChecker.execute(checkStr4);

        System.out.println("Data: " + checkStr1 + "; OR Result: " + orResult1);
        System.out.println("Data: " + checkStr2 + "; OR Result: " + orResult2);
        System.out.println("Data: " + checkStr3 + "; OR Result: " + orResult3);
        System.out.println("Data: " + checkStr4 + "; OR Result: " + orResult4);

        System.out.println("\n----------------------------------------------\n");

        boolean xorResult1 = xorChecker.execute(checkStr1);
        boolean xorResult2 = xorChecker.execute(checkStr2);
        boolean xorResult3 = xorChecker.execute(checkStr3);
        boolean xorResult4 = xorChecker.execute(checkStr4);

        System.out.println("Data: " + checkStr1 + "; XOR Result: " + xorResult1);
        System.out.println("Data: " + checkStr2 + "; XOR Result: " + xorResult2);
        System.out.println("Data: " + checkStr3 + "; XOR Result: " + xorResult3);
        System.out.println("Data: " + checkStr4 + "; XOR Result: " + xorResult4);
    }
}
