// phone-interview.ts

import Interview from "./interview";

class PhoneInterview extends Interview {
    constructor(nextInterview: Interview | null) {
        super(nextInterview);
    }

    execute(): void {
        // Ask all questions for phone interview
        // Perform any other action required for phone interview
        console.log("Ask phone interview questions")

        // Execute the next interview set while creating new struct
        if (this.nextInterview) {
            this.nextInterview.execute();
        }
    }

}

export default PhoneInterview;