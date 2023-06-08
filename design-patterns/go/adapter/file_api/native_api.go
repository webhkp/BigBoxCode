// native_api.go

package main

import "fmt"

type NativeApi struct {
}

func NewNativeApi() (nativeApi *NativeApi) {
	nativeApi = &NativeApi{}
	return
}

func (nativeApi *NativeApi) FetchData() (string) {
	// code to fetch data from native API

	fmt.Println("Fetching data from Native API")
	return "Data read from Native Api"
}

func (nativeApi *NativeApi) SendData(data string) {
	// code to send data to native API

	fmt.Printf("Sending data to Native API: %v", data)
}