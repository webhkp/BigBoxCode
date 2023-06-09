// third-party-api.ts

import Api from "./api";

class ThirdPartyApi implements Api {
    fetchData(): string {
        console.log("Fetching data from Third Party API");
        return "Data read from Third Party Api";
    }

    sendData(data: string): void {
        console.log("Sending data to Third Party API: " + data);
    }
}

export default ThirdPartyApi;