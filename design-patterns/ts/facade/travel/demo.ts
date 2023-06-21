// demo.ts

import TravelFacade from "./travel-facade";

const travelFacade = new TravelFacade(10, 10, 20, 30);

const currentLocation = travelFacade.getCurrentLocation();

console.log("Current Latitude: " + currentLocation.getLat());
console.log("Current Longitude: " + currentLocation.getLng());


travelFacade.getLocationInfo(20, 30);

travelFacade.getTotalTollAmount(20, 30);

travelFacade.operateCar();
