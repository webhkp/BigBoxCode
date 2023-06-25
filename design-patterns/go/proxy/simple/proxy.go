// proxy.go

package main

type Proxy struct {
	actual ProxyI
}

func NewProxy() (proxy *Proxy) {
	proxy = &Proxy{}
	return
}

func (proxy *Proxy) Operation1() {
	if proxy.actual == nil {
		proxy.actual = NewActual()
	}
	proxy.actual.Operation1()
}

func (proxy *Proxy) Operation2() {
	if proxy.actual == nil {
		proxy.actual = NewActual()
	}
	proxy.actual.Operation2()
}
