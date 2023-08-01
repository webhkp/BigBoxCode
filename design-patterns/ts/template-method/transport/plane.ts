// plane.ts

import Transport from "./transport";


class Plane extends Transport {
    createBody(): void {
        console.log("Creating Plane Body");
    }

    addEngine(): void {
        console.log("Adding Engine to Plane");
    }

    addWheel(): void {
        console.log("Adding 3 Wheels to Plane");
    }

    addWing(): void {
        console.log("Adding Wings Plane");
    }
}

export default Plane;