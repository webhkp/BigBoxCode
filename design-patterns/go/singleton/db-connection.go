package main

import "fmt"

type connection struct {
	host     string
	port     string
	username string
	password string
}

type DbConnection interface {
	printInfo()
	executeQuery(query string)
}

var dbConnectionInstance *connection

func GetDbInstance(host, port, username, password string) *connection {
	if dbConnectionInstance == nil {
		fmt.Println("Creating a new database instance")

		dbConnectionInstance = &connection{host, port, username, password}

		return dbConnectionInstance
	}

	fmt.Println("Returing existing database instance")
	return dbConnectionInstance
}

func (conn *connection) printInfo() {
	fmt.Println("host:", conn.host)
	fmt.Println("post:", conn.port)
	fmt.Println("username:", conn.username)
	fmt.Println("password:", conn.password)
}

func (conn *connection) executeQuery(query string) {
	fmt.Println("Executing: ", query)
}

func main() {
	dbInstance1 := GetDbInstance("localhost", "3306", "root", "complex#password")
	dbInstance1.printInfo()

	dbInstance2 := GetDbInstance("localhost2", "2222", "root2", "complex#password2")
	dbInstance2.printInfo()

	if dbInstance1 == dbInstance2 {
		fmt.Println("dbInstance 1 and 2 are same instance")
	} else {
		fmt.Println("dbInstance 1 and 2 are different")
	}

}
