// technical-interview.ts

import Interview from "./interview";

class TechnicalInterview extends Interview {
    constructor(nextInterview: Interview | null) {
        super(nextInterview);
    }

    execute(): void {
        // Ask all questions for technical interview
        // Perform any other action required for technical interview
        console.log("Ask technical interview questions")

        // Execute the next interview set while creating new struct
        if (this.nextInterview) {
            this.nextInterview.execute();
        }
    }

}

export default TechnicalInterview;