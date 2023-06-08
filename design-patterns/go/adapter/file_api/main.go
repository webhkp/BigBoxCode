// main.go

package main

func main() {
	// make a call to third part API for testing
	thirdPartyApi := NewThirdPartyApi()
	thirdPartyApi.FetchData()
	thirdPartyApi.SendData("1234")

	// Make a call to the file via FileAdapter
	file := NewFileOp()
	fileAdapter := NewFileAdapter(file)
	fileAdapter.FetchData()
	fileAdapter.SendData("ABCDEF")
}
