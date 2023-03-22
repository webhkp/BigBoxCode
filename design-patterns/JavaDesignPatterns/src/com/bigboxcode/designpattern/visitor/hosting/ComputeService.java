package com.bigboxcode.designpattern.visitor.hosting;

public class ComputeService implements Service {

    private final double price = 10.50;
    private int quantity;

    public ComputeService(int quantity) {
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
