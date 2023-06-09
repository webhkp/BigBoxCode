// demo.ts

import FileAdapter from "./file-adapter";
import FileOperation from "./file-operation";
import ThirdPartyApi from "./third-party-api";

// make a call to third part API for testing
const thirdPartyApi = new ThirdPartyApi();
thirdPartyApi.fetchData();
thirdPartyApi.sendData("1234");


// Make a call to the file via FileAdapter
const file = new FileOperation();
const fileAdapter = new FileAdapter(file);
fileAdapter.fetchData();
fileAdapter.sendData("ABCDEF");