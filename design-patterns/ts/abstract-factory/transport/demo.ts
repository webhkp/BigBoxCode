// demo.ts

import FactoryProducer from "./factory-producer";

const transportFactory1 = FactoryProducer.getFactory(2);

const transport1 = transportFactory1?.getTransport("bicycle");
transport1?.start();

const transportFactory2 = FactoryProducer.getFactory(4);

const transport2 = transportFactory2?.getTransport("truck");
transport2?.start();
transport2?.stop();