// demo.ts

import OrderContext from "./order-context";


const order = new OrderContext();

order.runNextProcess();
order.runNextProcess();
order.runNextProcess();
order.runNextProcess();

// Trying to process after all steps are complete
order.runNextProcess();
