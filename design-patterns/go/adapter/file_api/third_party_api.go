// third_party_api.go

package main

import "fmt"

type ThirdPartyApi struct {
}

func NewThirdPartyApi() (thirdPartyApi *ThirdPartyApi) {
	thirdPartyApi = &ThirdPartyApi{}
	return
}

func (thirdPartyApi *ThirdPartyApi) FetchData() (string) {
	// code to fetch data from Third Party API

	fmt.Println("Fetching data from Third Party API")
	return "Data read from Third Party Api"
}

func (thirdPartyApi *ThirdPartyApi) SendData(data string) {
	// code to send data to Third Party API

	fmt.Printf("Sending data to Third Party API: %v\n", data)
}