package com.bigboxcode.designpattern.visitor.hosting;

public class FileStorageService implements Service {

    private final double pricePerGB = 1.70;
    private int quantity;

    public FileStorageService(int quantity) {
        this.quantity = quantity;
    }

    public double getPricePerGB() {
        return pricePerGB;
    }

    public int getQuantity() {
        return quantity;
    }

    @Override
    public double accept(HostingCalculatorVisitor hostingCalculatorVisitor) {
        return hostingCalculatorVisitor.visit(this);
    }
}