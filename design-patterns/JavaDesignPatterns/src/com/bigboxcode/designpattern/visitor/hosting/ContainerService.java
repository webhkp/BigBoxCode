package com.bigboxcode.designpattern.visitor.hosting;

public class ContainerService implements Service {

    private final double price = 5.60;
    private int quantity;

    public ContainerService(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    @Override
    public double accept(HostingCalculatorVisitor hostingCalculatorVisitor) {
        return hostingCalculatorVisitor.visit(this);
    }
}