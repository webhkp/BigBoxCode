// proxy.ts

import Item from "./item";
import ProxyInterface from "./proxy-interface";

class Proxy implements ProxyInterface {
    private item: ProxyInterface | null = null;

    public operation1(): void {
        if (this.item == null) {
            this.item = new Item();
        }
        this.item.operation1();
    }

    public operation2(): void {
        if (this.item == null) {
            this.item = new Item();
        }
        this.item.operation2();
    }
}

export default Proxy;