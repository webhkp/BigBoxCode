// request.go

package main

import "fmt"

type RequestType int

const (
	GET RequestType = iota
	POST
	PUT
	PATCH
	DELETE
)

type Request struct {
	url         string
	requestType RequestType
	header      map[string]string
	body        map[string]string

	Builder
}

func (rcvr *Request) Send() {
	fmt.Println("Sending Request...")
	fmt.Printf("\nURL: %v", rcvr.url)
	fmt.Printf("\nRequest Type: %v", rcvr.requestType)
	fmt.Printf("\nHeaders: %v", rcvr.header)
	fmt.Printf("\nBody: %v", rcvr.body)

	// Write code for actually sending the request here
}
