// ceo-interview.ts

import Interview from "./interview";

class CeoInterview extends Interview {
    constructor(nextInterview: Interview | null) {
        super(nextInterview);
    }

    execute(): void {
        // Ask all questions for ceo interview
        // Perform any other action required for ceo interview
        console.log("Ask ceo interview questions")

        // Execute the next interview set while creating new struct
        if (this.nextInterview) {
            this.nextInterview.execute();
        }
    }

}

export default CeoInterview;