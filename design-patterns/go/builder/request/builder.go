// builder.go

package main

type Builder struct {
	url         string
	requestType RequestType
	header      map[string]string
	body        map[string]string
}

func (builder *Builder) SetUrl(url string) *Builder {
	builder.url = url
	return builder
}

func (builder *Builder) SetRequestType(reqeustType RequestType) *Builder {
	builder.requestType = reqeustType
	return builder
}

func (builder *Builder) AddHeader(key, value string) *Builder {
	if builder.header == nil {
		builder.header = make(map[string]string)
	}

	builder.header[key] = value
	return builder
}

func (builder *Builder) AddBody(key, value string) *Builder {
	if builder.body == nil {
		builder.body = make(map[string]string)
	}

	builder.body[key] = value
	return builder
}

func (builder *Builder) Build() (request Request) {
	request = Request{}
	request.url = builder.url
	request.requestType = builder.requestType
	request.header = builder.header
	request.body = builder.body

	return
}
