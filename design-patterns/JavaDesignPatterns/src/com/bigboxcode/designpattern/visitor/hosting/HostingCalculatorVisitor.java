// HostingCalculatorVisitor.java

package com.bigboxcode.designpattern.visitor.hosting;

public interface HostingCalculatorVisitor {

    double visit(ComputeService computeService);

    double visit(ContainerService containerService);

    double visit(DatabaseService databaseService);

    double visit(FileStorageService fileStorageService);

    double visit(ServerlessService serverlessService);
}
