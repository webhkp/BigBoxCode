// connection.go

package main

import (
	"fmt"
	"log"
	"sync"
)

// Struct for database connection information
type connection struct {
	host     string
	port     string
	username string
	password string
}

// Interface for connection related functions
type DbConnection interface {
	PrintInfo()
	ExecuteQuery(query string)
}

// Store connection reference
var dbConnectionInstance *connection

// To make sure instance generation code is executed only once
var once sync.Once

// Function for generating and getting database connection instance
func GetDbInstance(host, port, username, password string) *connection {
	// Use once.Do to make sure the instance generation code is executed only once
	once.Do(func() {
		log.Println("Creating a new database instance")

		// Create a new instance and store it in the dbConnectionInstance variable
		dbConnectionInstance = &connection{host, port, username, password}
	})

	return dbConnectionInstance
}

// Utility function for demonestrating database connection information -- Dummy function
func (conn *connection) PrintInfo() {
	fmt.Println("host:", conn.host)
	fmt.Println("post:", conn.port)
	fmt.Println("username:", conn.username)
	fmt.Println("password:", conn.password)
}

// Utility function for database -- Dummy function
func (conn *connection) ExecuteQuery(query string) {
	fmt.Println("Executing: ", query)
}
