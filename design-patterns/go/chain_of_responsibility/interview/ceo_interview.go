// ceo_interview.go

package main

import "fmt"

type CeoInterview struct {
	nextInterview Interview
}

func NewCeoInterview(nextInterview Interview) (ceoInterview *CeoInterview) {
	ceoInterview = &CeoInterview{}
	ceoInterview.nextInterview = nextInterview
	return
}

func (ceoInterview *CeoInterview) Execute() {
	// Ask all questions for ceo interview
	// Perform any other action required for ceo interview
	fmt.Println("Ask CEO interview questions")

	// Execute the next interview set while creating new struct
	if ceoInterview.nextInterview != nil {
		ceoInterview.nextInterview.Execute()
	}
}
