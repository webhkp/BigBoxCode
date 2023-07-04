// hr-interview.ts

import Interview from "./interview";

class HrInterview extends Interview {
    constructor(nextInterview: Interview | null) {
        super(nextInterview);
    }

    execute(): void {
        // Ask all questions for hr interview
        // Perform any other action required for hr interview
        console.log("Ask hr interview questions")

        // Execute the next interview set while creating new struct
        if (this.nextInterview) {
            this.nextInterview.execute();
        }
    }

}

export default HrInterview;