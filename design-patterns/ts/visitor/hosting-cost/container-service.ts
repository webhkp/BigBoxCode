// container-service.ts

import HostingCalculatorVisitor from "./hosting-calculator-visitor";
import Service from "./service";

class ContainerService implements Service {

    private readonly price: number = 5.60;
    private quantity: number;

    constructor(quantity: number) {
        this.quantity = quantity;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    accept(hostingCalculatorVisitor: HostingCalculatorVisitor): number {
        return hostingCalculatorVisitor.visit(this);
    }
}

export default ContainerService;