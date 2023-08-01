// subtract.ts

import Calculation from "./calculation";

class Subtract implements Calculation {
    execute(num1: number, num2: number): number {
        return num1 - num2;
    }
}

export default Subtract;