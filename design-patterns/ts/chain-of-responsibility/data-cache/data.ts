// data.ts

export enum DATA_TYPE {
    DATA,
    JAVASCRIPT,
    CSS
};

class Data {
    private type: DATA_TYPE;
    private data: string;
    private key: string;

    constructor(type: DATA_TYPE, key: string, data: string) {
        this.type = type;
        this.key = key;
        this.data = data;
    }

    getType(): DATA_TYPE {
        return this.type;
    }

    getKey(): string {
        return this.key;
    }

    getData(): string {
        return this.data;
    }
}

export default Data;