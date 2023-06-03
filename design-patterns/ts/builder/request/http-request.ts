// http-request.ts

export enum RequestType {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}

class HttpRequest {
    private url: string;
    private type: RequestType;
    private header = new Map<string, string>();
    private body = new Map<string, string>();

    constructor(
        url: string,
        type: RequestType,
        header: Map<string, string>,
        body: Map<string, string>
        ) {
        this.url = url;
        this.type = type;
        this.header = header;
        this.body = body;
    }

    public send() {
        console.log("Sending Request...");
        console.log("URL: ", this.url);
        console.log("Type: ", this.type);
        console.log("Header: ", this.header);
        console.log("Body: ", this.body);
        
        // Write code to send the request here
    }

    static Builder = class {
        private url: string = "";
        private type: RequestType = RequestType.GET;
        private header = new Map<string, string>();
        private body = new Map<string, string>();

        public setUrl(url: string) {
            this.url = url;
            return this;
        }

        public setType(type: RequestType) {
            this.type = type;
            return this;
        }

        public setHeader(key: string, value: string) {
            this.header.set(key, value);
            return this;
        }

        public setBody(key: string, value: string) {
            this.body.set(key, value);
            return this;
        }

        public build() {
            return new HttpRequest(this.url, this.type, this.header, this.body);
        }
    }
}

export default HttpRequest;