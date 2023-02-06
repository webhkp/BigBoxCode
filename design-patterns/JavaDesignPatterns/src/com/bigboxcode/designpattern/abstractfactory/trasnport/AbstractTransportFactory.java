package com.bigboxcode.designpattern.abstractfactory.trasnport;

public interface AbstractTransportFactory {

    Transport getTransport(String type);
}