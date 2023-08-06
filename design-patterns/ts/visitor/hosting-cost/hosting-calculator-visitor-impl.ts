// hosting-calculator-visitor-impl.ts

import ComputeService from "./compute-service";
import ContainerService from "./container-service";
import DatabaseService from "./database-service";
import FileStorageService from "./file-storage-service";
import HostingCalculatorVisitor from "./hosting-calculator-visitor";
import ServerlessService from "./serverless-service";
import Service from "./service";


class HostingCalculatorVisitorImpl implements HostingCalculatorVisitor {
    visit(service: Service): number {
        if (service instanceof ComputeService) {
            return service.getPrice() * service.getQuantity();
        }

        if (service instanceof ContainerService) {
            return service.getPrice() * service.getQuantity();
        }

        if (service instanceof DatabaseService) {

            const serviceCost = service.getPrice() * service.getQuantity();
            let backupCost = 0;

            if (service.isBackupEnabled()) {
                backupCost = service.getBackPrice() * service.getQuantity();
            }

            return serviceCost + backupCost;
        }
        if (service instanceof FileStorageService) {
            return service.getPricePerGB() * service.getQuantity();
        }

        if (service instanceof ServerlessService) {
            return service.getHourlyPrice() * service.getHourlyPrice();
        }

        return 0;
    }
}

export default HostingCalculatorVisitorImpl;