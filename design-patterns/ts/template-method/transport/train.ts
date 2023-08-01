// train.ts

import Transport from "./transport";

class Train extends Transport {
    createBody(): void {
        console.log("Creating Train Body");
    }

    addEngine(): void {
        console.log("Adding Engine to Train");
    }

    addWheel(): void {
        console.log("Adding Wheels to Train");
    }

    addWing() : void{
        // not required for train
    }
}

export default Train;