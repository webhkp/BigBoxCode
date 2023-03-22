// ServerlessService.java

package com.bigboxcode.designpattern.visitor.hosting;

public class ServerlessService implements Service {

    private final double hourlyPrice = 0.32;
    private int totalHours;

    public ServerlessService(int totalHours) {
        this.totalHours = totalHours;
    }

    public double getHourlyPrice() {
        return hourlyPrice;
    }

    public int getTotalHours() {
        return totalHours;
    }

    @Override
    public double accept(HostingCalculatorVisitor hostingCalculatorVisitor) {
        return hostingCalculatorVisitor.visit(this);
    }
}