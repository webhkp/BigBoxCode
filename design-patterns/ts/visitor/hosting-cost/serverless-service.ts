// serverless-service.ts

import HostingCalculatorVisitor from "./hosting-calculator-visitor";
import Service from "./service";

class ServerlessService implements Service {

    private readonly hourlyPrice: number = 0.32;
    private totalHours: number;

    constructor(totalHours: number) {
        this.totalHours = totalHours;
    }

    getHourlyPrice(): number {
        return this.hourlyPrice;
    }

    getTotalHours(): number {
        return this.totalHours;
    }

    accept( hostingCalculatorVisitor: HostingCalculatorVisitor): number {
        return hostingCalculatorVisitor.visit(this);
    }
}

export default ServerlessService;