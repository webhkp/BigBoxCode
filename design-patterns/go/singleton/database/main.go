// main.go

package main

import "fmt"

func main() {
	// Create fist instance
	dbInstance1 := GetDbInstance("localhost", "3306", "root", "complex#password")
	dbInstance1.PrintInfo()

	// Create second instance
	dbInstance2 := GetDbInstance("localhost2", "2222", "root2", "complex#password2")
	dbInstance2.PrintInfo()

	// Compare the 2 instances. Both should be same, as both should refernece to the same instance
	if dbInstance1 == dbInstance2 {
		fmt.Println("dbInstance 1 and 2 are same instance") // This is the expected output
	} else {
		fmt.Println("dbInstance 1 and 2 are different")
	}

}
