// demo.ts

import Add from "./add";
import Divide from "./divide";
import Multiply from "./multiply";
import Subtract from "./subtract";
import CalculationStrategy from "./calculation-strategy";


console.log("Performing operation: ADD");
var myCalculation = new CalculationStrategy(new Add());
var result = myCalculation.execute(10, 5);
console.log("10 + 5 = " + result);

console.log("\n\nPerforming operation: SUBTRACT");
myCalculation = new CalculationStrategy(new Subtract());
result = myCalculation.execute(10, 5);
console.log("10 - 5 = " + result);

console.log("\n\nPerforming operation: MULTIPLY");
myCalculation = new CalculationStrategy(new Multiply());
result = myCalculation.execute(10, 5);
console.log("10 * 5 = " + result);

console.log("\n\nPerforming operation: DIVIDE");
myCalculation = new CalculationStrategy(new Divide());
result = myCalculation.execute(10, 5);
console.log("10 / 5 = " + result);
