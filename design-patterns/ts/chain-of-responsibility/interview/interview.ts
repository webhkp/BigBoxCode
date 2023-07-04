// interview.ts

abstract class Interview {
    protected nextInterview: Interview | null;

    constructor(nextInterview: Interview | null) {
        this.nextInterview = nextInterview;
    }

    abstract execute(): void;
}

export default Interview;