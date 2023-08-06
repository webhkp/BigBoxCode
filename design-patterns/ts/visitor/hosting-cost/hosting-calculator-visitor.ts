// hosting-calculator-visitor.ts

import ComputeService from "./compute-service";
import ContainerService from "./container-service";
import DatabaseService from "./database-service";
import FileStorageService from "./file-storage-service";
import ServerlessService from "./serverless-service";
import Service from "./service";

interface HostingCalculatorVisitor {

    // visit(computeService: ComputeService): number;

    // visit(containerService: ContainerService): number;

    // visit(databaseService: DatabaseService): number;

    // visit(fileStorageService: FileStorageService): number;

    // visit(serverlessService: ServerlessService): number;

    visit(service: Service): number;
}

export default HostingCalculatorVisitor;