// api.ts

interface Api {
    fetchData(): string;
    sendData(data: string): void;
}

export default Api;