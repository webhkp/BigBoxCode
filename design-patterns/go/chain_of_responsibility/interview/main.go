// main.go

package main

func main() {
	interview := NewPhoneInterview(NewTechnicalInterview(NewHrInterview(NewCeoInterview(nil))))

	interview.Execute()
}
