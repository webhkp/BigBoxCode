package com.bigboxcode.designpattern.visitor.hosting;

public class DatabaseService implements Service {

    private final double price = 100.00;
    private final double backPrice = 30.00;
    private int quantity;
    private boolean backupEnabled = false;

    public DatabaseService(int quantity) {
        this.quantity = quantity;
    }

    public DatabaseService(int quantity, boolean backupEnabled) {
        this.quantity = quantity;
        this.backupEnabled = backupEnabled;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getBackPrice() {
        return backPrice;
    }

    public boolean isBackupEnabled() {
        return backupEnabled;
    }

    @Override
    public double accept(HostingCalculatorVisitor hostingCalculatorVisitor) {
        return hostingCalculatorVisitor.visit(this);
    }
}