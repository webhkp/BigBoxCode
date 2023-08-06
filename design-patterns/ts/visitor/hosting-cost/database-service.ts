// database-service.ts

import HostingCalculatorVisitor from "./hosting-calculator-visitor";
import Service from "./service";


class DatabaseService implements Service {

    private readonly price: number = 100.00;
    private readonly backPrice: number = 30.00;
    private quantity: number;
    private backupEnabled: boolean = false;

    constructor(quantity: number, backupEnabled: boolean = false) {
        this.quantity = quantity;
        this.backupEnabled = backupEnabled;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getBackPrice(): number {
        return this.backPrice;
    }

    isBackupEnabled(): boolean {
        return this.backupEnabled;
    }

    accept(hostingCalculatorVisitor: HostingCalculatorVisitor): number {
        return hostingCalculatorVisitor.visit(this);
    }
}

export default DatabaseService;