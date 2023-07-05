// demo.ts

import AndOperation from "./and-operation";
import OrOperation from "./or-operation";
import TerminalOperation from "./terminal-operation";
import XorOperation from "./xor-operation";

var op1 = new TerminalOperation("Big");
var op2 = new TerminalOperation("Box");

var andChecker = new AndOperation(op1, op2);
var orChecker = new OrOperation(op1, op2);
var xorChecker = new XorOperation(op1, op2);

var checkStr1 = "Big Box Code";
var checkStr2 = "Only Big Code";
var checkStr3 = "Only Box Code";
var checkStr4 = "No Code";

var andResult1 = andChecker.execute(checkStr1);
var andResult2 = andChecker.execute(checkStr2);
var andResult3 = andChecker.execute(checkStr3);
var andResult4 = andChecker.execute(checkStr4);

console.log("Data: " + checkStr1 + "; AND Result: " + andResult1);
console.log("Data: " + checkStr2 + "; AND Result: " + andResult2);
console.log("Data: " + checkStr3 + "; AND Result: " + andResult3);
console.log("Data: " + checkStr4 + "; AND Result: " + andResult4);

var orResult1 = orChecker.execute(checkStr1);
var orResult2 = orChecker.execute(checkStr2);
var orResult3 = orChecker.execute(checkStr3);
var orResult4 = orChecker.execute(checkStr4);

console.log("Data: " + checkStr1 + "; OR Result: " + orResult1);
console.log("Data: " + checkStr2 + "; OR Result: " + orResult2);
console.log("Data: " + checkStr3 + "; OR Result: " + orResult3);
console.log("Data: " + checkStr4 + "; OR Result: " + orResult4);

var xorResult1 = xorChecker.execute(checkStr1);
var xorResult2 = xorChecker.execute(checkStr2);
var xorResult3 = xorChecker.execute(checkStr3);
var xorResult4 = xorChecker.execute(checkStr4);

console.log("Data: " + checkStr1 + "; XOR Result: " + xorResult1);
console.log("Data: " + checkStr2 + "; XOR Result: " + xorResult2);
console.log("Data: " + checkStr3 + "; XOR Result: " + xorResult3);
console.log("Data: " + checkStr4 + "; XOR Result: " + xorResult4);
