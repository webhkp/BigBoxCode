// demo.ts

import AndOperation from "./and-operation";
import OrOperation from "./or-operation";
import TerminalOperation from "./terminal-operation";
import XorOperation from "./xor-operation";

const op1 = new TerminalOperation("Big");
const op2 = new TerminalOperation("Box");

const andChecker = new AndOperation(op1, op2);
const orChecker = new OrOperation(op1, op2);
const xorChecker = new XorOperation(op1, op2);

const checkStr1 = "Big Box Code";
const checkStr2 = "Only Big Code";
const checkStr3 = "Only Box Code";
const checkStr4 = "No Code";

const andResult1 = andChecker.execute(checkStr1);
const andResult2 = andChecker.execute(checkStr2);
const andResult3 = andChecker.execute(checkStr3);
const andResult4 = andChecker.execute(checkStr4);

console.log("Data: " + checkStr1 + "; AND Result: " + andResult1);
console.log("Data: " + checkStr2 + "; AND Result: " + andResult2);
console.log("Data: " + checkStr3 + "; AND Result: " + andResult3);
console.log("Data: " + checkStr4 + "; AND Result: " + andResult4);

const orResult1 = orChecker.execute(checkStr1);
const orResult2 = orChecker.execute(checkStr2);
const orResult3 = orChecker.execute(checkStr3);
const orResult4 = orChecker.execute(checkStr4);

console.log("Data: " + checkStr1 + "; OR Result: " + orResult1);
console.log("Data: " + checkStr2 + "; OR Result: " + orResult2);
console.log("Data: " + checkStr3 + "; OR Result: " + orResult3);
console.log("Data: " + checkStr4 + "; OR Result: " + orResult4);

const xorResult1 = xorChecker.execute(checkStr1);
const xorResult2 = xorChecker.execute(checkStr2);
const xorResult3 = xorChecker.execute(checkStr3);
const xorResult4 = xorChecker.execute(checkStr4);

console.log("Data: " + checkStr1 + "; XOR Result: " + xorResult1);
console.log("Data: " + checkStr2 + "; XOR Result: " + xorResult2);
console.log("Data: " + checkStr3 + "; XOR Result: " + xorResult3);
console.log("Data: " + checkStr4 + "; XOR Result: " + xorResult4);
