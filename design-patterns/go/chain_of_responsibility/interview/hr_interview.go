// hr_interview.go

package main

import "fmt"

type HrInterview struct {
	nextInterview Interview
}

func NewHrInterview(nextInterview Interview) (hrInterview *HrInterview) {
	hrInterview = &HrInterview{}
	hrInterview.nextInterview = nextInterview
	return
}

func (hrInterview *HrInterview) Execute() {
	// Ask all questions for Hhr interview
	// Perform any other action required for Hhr interview
	fmt.Println("Ask HR interview questions")

	// Execute the next interview set while creating new struct
	if hrInterview.nextInterview != nil {
		hrInterview.nextInterview.Execute()
	}
}
