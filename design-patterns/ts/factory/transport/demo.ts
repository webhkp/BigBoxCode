import TransportFactory from "./transport-factory";

const transportFactory = new TransportFactory();

const transport1 = transportFactory.getTransport("bike");
transport1?.start();

const transport2 = transportFactory.getTransport("car");
transport2?.start();
transport2?.stop();

const transport3 = transportFactory.getTransport("plane");
transport3?.start();
