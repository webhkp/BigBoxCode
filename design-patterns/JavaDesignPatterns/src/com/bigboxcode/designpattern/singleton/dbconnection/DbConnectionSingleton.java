// DbConnectionSingleton.java

package com.bigboxcode.designpattern.singleton.dbconnection;

public final class DbConnectionSingleton {

    private static DbConnectionSingleton dbInstance;
    private String url;
    private String port;
    private String username;
    private String password;

    private DbConnectionSingleton(String url, String port, String username, String password) {
        this.url = url;
        this.port = port;
        this.username = username;
        this.password = password;
    }

    public static DbConnectionSingleton getInstance(String url, String port, String username, String password) {
        if (dbInstance == null) {
            dbInstance = new DbConnectionSingleton(url, port, username, password);
        }
        return dbInstance;
    }

    public void printConnectionDetails() {
        System.out.println("URL: " + url);
        System.out.println("Port: " + port);
        System.out.println("User name: " + username);
        System.out.println("Password: " + password);
    }

    public void executeQuery(String query) {
        System.out.println("Executing query: " + query);
    }
}