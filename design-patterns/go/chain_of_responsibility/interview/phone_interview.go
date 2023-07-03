// phone_interview.go

package main

import "fmt"

type PhoneInterview struct {
	nextInterview Interview
}

func NewPhoneInterview(nextInterview Interview) (phoneInterview *PhoneInterview) {
	phoneInterview = &PhoneInterview{}
	phoneInterview.nextInterview = nextInterview
	return
}

func (phoneInterview *PhoneInterview) Execute() {
	// Ask all questions for phone interview
	// Perform any other action required for phone interview
	fmt.Println("Ask phone interview questions")

	// Execute the next interview set while creating new struct
	if phoneInterview.nextInterview != nil {
		phoneInterview.nextInterview.Execute()
	}
}
