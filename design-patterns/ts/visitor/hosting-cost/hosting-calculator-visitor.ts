// hosting-calculator-visitor.ts

import Service from "./service";

interface HostingCalculatorVisitor {
    visit(service: Service): number;
}

export default HostingCalculatorVisitor;