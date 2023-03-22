// Service.java

package com.bigboxcode.designpattern.visitor.hosting;

public interface Service {

    double accept(HostingCalculatorVisitor hostingCalculatorVisitor);
}
