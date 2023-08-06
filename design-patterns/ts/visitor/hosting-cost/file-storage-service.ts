// file-storage-service.ts

import HostingCalculatorVisitor from "./hosting-calculator-visitor";
import Service from "./service";


class FileStorageService implements Service {

    private readonly pricePerGB: number = 1.70;
    private quantity: number;

    constructor(quantity: number) {
        this.quantity = quantity;
    }

    getPricePerGB(): number {
        return this.pricePerGB;
    }

    getQuantity(): number {
        return this.quantity;
    }

    accept(hostingCalculatorVisitor: HostingCalculatorVisitor): number {
        return hostingCalculatorVisitor.visit(this);
    }
}

export default FileStorageService;