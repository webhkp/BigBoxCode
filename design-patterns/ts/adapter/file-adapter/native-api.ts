// native-api.ts

import Api from "./api";

class NativeApi implements Api {
    fetchData(): string {
        console.log("Fetching data from Native API");
        return "Data read from Native Api";
    }

    sendData(data: string): void {
        console.log("Sending data to Native API: " + data);
    }
}

export default NativeApi;