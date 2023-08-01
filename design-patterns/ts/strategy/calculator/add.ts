// add.ts

import Calculation from "./calculation";

class Add implements Calculation {
    execute(num1: number, num2: number): number {
        return num1 + num2;
    }
}

export default Add;