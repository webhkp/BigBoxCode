// main.go

package main

func main() {
	var request Request
	builder := request.Builder.
		SetUrl("https://bigboxcode.com/request-test").
		SetRequestType(POST).
		AddHeader("X-AUTH-TOKEN", "someTokeHere").
		AddHeader("X-SOME-HEADER", "someRandomHeaderValueHere").
		AddBody("unit_id", "99").
		AddBody("code", "8BI4BO6CO2").
		Build()

	builder.Send()
}
