// HostingCalculatorVisitorImpl.java

package com.bigboxcode.designpattern.visitor.hosting;

public class HostingCalculatorVisitorImpl implements HostingCalculatorVisitor {
    @Override
    public double visit(ComputeService computeService) {
        return computeService.getPrice() * computeService.getQuantity();
    }

    @Override
    public double visit(ContainerService containerService) {
        return containerService.getPrice() * containerService.getQuantity();
    }

    @Override
    public double visit(DatabaseService databaseService) {
        double serviceCost = databaseService.getPrice() * databaseService.getQuantity();
        double backupCost = 0;

        if (databaseService.isBackupEnabled()) {
            backupCost = databaseService.getBackPrice() * databaseService.getQuantity();
        }

        return serviceCost + backupCost;
    }

    @Override
    public double visit(FileStorageService fileStorageService) {
        return fileStorageService.getPricePerGB() * fileStorageService.getQuantity();
    }

    @Override
    public double visit(ServerlessService serverlessService) {
        return serverlessService.getHourlyPrice() * serverlessService.getHourlyPrice();
    }
}
