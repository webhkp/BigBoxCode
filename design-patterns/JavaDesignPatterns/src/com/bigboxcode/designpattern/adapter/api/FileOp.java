// FileOp.java

package com.bigboxcode.designpattern.adapter.api;

public class FileOp implements File{

    public String readFile() {
        // Code to read from file

        System.out.println("Reading from file");

        return "some dummy response read from file";
    }

    public void writeFile(String input) {
        // Write to file related code here

        System.out.println("Writing to file: " + input);
    }
}
