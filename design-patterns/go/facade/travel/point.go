// point.go

package main

type Point struct {
	x, y float64
}

func NewPoint(x, y float64)(point *Point) {
	point = &Point{}
	point.x = x
	point.y = y
	return
}