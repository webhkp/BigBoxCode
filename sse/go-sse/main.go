package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type msgReqStruct struct {
	Message string
}

var sseChannel chan string

func main() {
	router := http.NewServeMux()

	router.HandleFunc("/events", sseEventsHandler)
	router.HandleFunc("/send-event", sseSendEvent)

	if err := http.ListenAndServe(":3000", router); err != nil {
		log.Fatal(err)
	}
}

func sseEventsHandler(resWritter http.ResponseWriter, req *http.Request) {
	fmt.Println("New connection established")

	resWritter.Header().Set("Access-Control-Allow-Origin", "*")
	resWritter.Header().Set("Content-Type", "text/event-stream")
	resWritter.Header().Set("Cache-Control", "no-cache")
	resWritter.Header().Set("Connection", "keep-alive")

	sseChannel = make(chan string)

	defer func() {
		close(sseChannel)
		sseChannel = nil
		fmt.Println("Closing connection")
	}()

	flusher, ok := resWritter.(http.Flusher)

	if !ok {
		fmt.Println("Unable to initialize flusher")
	}

	for {
		select {
		case msg := <-sseChannel:
			fmt.Fprintf(resWritter, "data: %s\n\n", msg)
			flusher.Flush()

		case <-req.Context().Done():
			fmt.Println("Connection closed")
			return
		}
	}
}

func sseSendEvent(resWritter http.ResponseWriter, req *http.Request) {
	var msgReq msgReqStruct

	if sseChannel == nil {
		panic("Channel not initialized")
	}

	if req.Method != http.MethodPost {
		panic("Method does not match")
	}

	err := json.NewDecoder(req.Body).Decode(&msgReq)

	if err != nil {
		// http.Error(resWritter, err.Error(), http.StatusBadRequest)
		panic("Error parsing request JSON")
	}

	sseChannel <- msgReq.Message
}
