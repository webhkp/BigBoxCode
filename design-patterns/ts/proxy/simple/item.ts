// item.ts

import ProxyInterface from "./proxy-interface";

class Item implements ProxyInterface {
    operation1(): void {
        console.log("Performing operation 1 in the Actual Object");
    }

    operation2(): void {
        console.log("Performing operation 2 in the Actual Object");
    }
}

export default Item;