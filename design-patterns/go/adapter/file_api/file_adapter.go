// file_adapter.go

package main

type FileAdapter struct {
	file File
}

func NewFileAdapter(file File) (fileAdapter *FileAdapter) {
	fileAdapter = &FileAdapter{}
	fileAdapter.file = file
	return
}

func (fileAdapter *FileAdapter) FetchData() string {
	// May perform additional operation or processing
	// before or after data is fetched

	return fileAdapter.file.ReadFile()
}

func (fileAdapter *FileAdapter) SendData(data string) {
	// May perform additional operation or processing
	// before or after data is written to file

	fileAdapter.file.WriteFile(data)
}
