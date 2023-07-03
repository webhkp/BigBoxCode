// technical_interview.go

package main

import "fmt"

type TechnicalInterview struct {
	nextInterview Interview
}

func NewTechnicalInterview(nextInterview Interview) (technicalInterview *TechnicalInterview) {
	technicalInterview = &TechnicalInterview{}
	technicalInterview.nextInterview = nextInterview
	return
}

func (technicalInterview *TechnicalInterview) Execute() {
	// Ask all questions for technical interview
	// Perform any other action required for technical interview
	fmt.Println("Ask technical interview questions")

	// Execute the next interview set while creating new struct
	if technicalInterview.nextInterview != nil {
		technicalInterview.nextInterview.Execute()
	}
}
