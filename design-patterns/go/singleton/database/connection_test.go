// connection_test.go

package main

import (
	"reflect"
	"testing"
)

func TestGetDbInstance(t *testing.T) {
	// Create 2 instances with different param
	connection1 := GetDbInstance("localhost", "1", "root1", "complex#password1")
	connection2 := GetDbInstance("localhost2", "2", "root2", "complex#password2")

	// Check if the 2 instances are the same or not
	if connection1 != connection2 {
		t.Error("Singleton database connnection does not return same instance")
	}

	// Compare with deep equal
	if !reflect.DeepEqual(connection1, connection2) {
		t.Error("Singleton instances has different values")
	}
}
