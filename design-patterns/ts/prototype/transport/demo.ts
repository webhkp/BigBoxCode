// demo.ts

import Car from "./car";


let carOriginal = new Car(2014, "ABCD", "Red");
console.log("Original Car:", carOriginal);


var carClone = <Car>carOriginal.clone();
carClone.model = "Some Different Model";
carClone.color = "White";

console.log("Clone Car:", carClone);

// check if original value is changed
console.log("Original Car after clone:", carOriginal);