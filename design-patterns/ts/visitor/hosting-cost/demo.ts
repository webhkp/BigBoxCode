// demo.ts

import ComputeService from "./compute-service";
import ContainerService from "./container-service";
import DatabaseService from "./database-service";
import FileStorageService from "./file-storage-service";
import HostingCalculatorVisitorImpl from "./hosting-calculator-visitor-impl";
import ServerlessService from "./serverless-service";
import Service from "./service";

// function for calculating price
function calculateHostingCost(services: Service[]): number {
    const hostingCalculatorVisitorImpl = new HostingCalculatorVisitorImpl();

    let totalCost = 0;

    for (let service of services) {
        totalCost += service.accept(hostingCalculatorVisitorImpl);
    }

    return totalCost;
}

// list of used service
const usedServices: Service[] = [
    new ComputeService(3),
    new DatabaseService(3, true),
    new FileStorageService(120),
    new ServerlessService(720),
    new ContainerService(2),
];

const totalCost = calculateHostingCost(usedServices);

console.log("Total cost of hosting is: " + totalCost);
