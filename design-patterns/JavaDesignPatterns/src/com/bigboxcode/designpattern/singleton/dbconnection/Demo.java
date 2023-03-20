// Demo.java

package com.bigboxcode.designpattern.singleton.dbconnection;

public class Demo {
    private static final String DB_URL = "localhost";
    private static final String DB_PORT = "5432";
    private static final String DB_USERNAME = "postgres";
    private static final String DB_PASSWORD = "secret*pass";

    private static final String DB_URL2 = "192.168.55.55";
    private static final String DB_PORT2 = "1234";
    private static final String DB_USERNAME2 = "postgres2";
    private static final String DB_PASSWORD2 = "secret*pass2";

    public static void main(String[] args) {
        DbConnectionSingleton dbConnection = DbConnectionSingleton.getInstance(DB_URL, DB_PORT, DB_USERNAME, DB_PASSWORD);
        System.out.println("First Connection Details:");
        dbConnection.printConnectionDetails();

        DbConnectionSingleton secondDbConnection = DbConnectionSingleton.getInstance(DB_URL2, DB_PORT2, DB_USERNAME2, DB_PASSWORD2);
        System.out.println("\n\nSecond Connection Details:");
        secondDbConnection.printConnectionDetails();
    }
}
