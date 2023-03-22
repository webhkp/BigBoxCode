// Demo.java

package com.bigboxcode.designpattern.visitor.hosting;


public class Demo {
    public static void main(String[] args) {
        Service[] usedServices = new Service[] {
                new ComputeService(3),
                new DatabaseService(3, true),
                new FileStorageService(120),
                new ServerlessService(720),
                new ContainerService(2),
        };

        double totalCost = calculateHostingCost(usedServices);

        System.out.println("Total cost of hosting is: " + totalCost);
    }

    private static double calculateHostingCost(Service[] services) {
        HostingCalculatorVisitorImpl hostingCalculatorVisitorImpl = new HostingCalculatorVisitorImpl();

        double totalCost = 0;

        for (Service service: services) {
            totalCost += service.accept(hostingCalculatorVisitorImpl);
        }

        return totalCost;
    }
}
