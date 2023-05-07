package main

import (
	"fmt"
	"log"
	"sync"
)

/** ---------- Singleton Implementation Start ---------- **/

// Define a struct for singleton
type singleton struct {
	logPath string // Some data for the struct
}

// Declare an variable to hold the singeton instance
var singletonInstance *singleton

// Declare once for using while generating singleton instance
var once sync.Once

// Define a function that is responsible for generating singleton instance
func GetInstance(logPath string) *singleton {
	// Generate the instance only once
	once.Do(func() {
		log.Println("Generating new singleton instance")

		singletonInstance = &singleton{logPath}
	})

	return singletonInstance
}

/** ---------- Singleton Implementation End ---------- **/

// Check the result in main
func main() {
	// Generate one instance
	singletonInstance1 := GetInstance("/path/abc")

	fmt.Println(singletonInstance1.logPath)

	// Try to generate another instance
	singletonInstance2 := GetInstance("/some/changed/path")

	fmt.Println(singletonInstance2.logPath)

	// Check if the 2 instances are same or not
	if singletonInstance1 == singletonInstance2 {
		fmt.Println("Singleton Instance 1 and 2 are same instance") // This is the expected output
	} else {
		fmt.Println("Singleton Instance 1 and 2 are different")
	}
}
