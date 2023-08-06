// service.ts

import HostingCalculatorVisitor from "./hosting-calculator-visitor";

interface Service {
    accept(hostingCalculatorVisitor: HostingCalculatorVisitor): number;
}

export default Service;