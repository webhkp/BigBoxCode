// data.go

package main

type DATA_TYPE int

const (
	DATA DATA_TYPE = iota
	JAVASCRIPT
	CSS
)

type Data struct {
	dataType DATA_TYPE
	key  string
	value string
}

func NewData(dataType DATA_TYPE, key string, value string) (data *Data) {
	data = &Data{}
	data.dataType = dataType
	data.key = key
	data.value = value
	return
}

func (data *Data) GetValue() (string) {
	return data.value
}

func (data *Data) GetKey() (string) {
	return data.key
}

func (data *Data) GetDataType() (DATA_TYPE) {
	return data.dataType
}