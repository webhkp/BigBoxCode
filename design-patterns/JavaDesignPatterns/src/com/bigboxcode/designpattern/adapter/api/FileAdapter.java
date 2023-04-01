// FileAdapter.java

package com.bigboxcode.designpattern.adapter.api;

public class FileAdapter implements Api {

    private final File file;

    public FileAdapter(File file) {
        this.file = file;
    }

    @Override
    public String fetchData() {
        return file.readFile();
    }

    @Override
    public void sendData(String data) {
        file.writeFile(data);
    }
}
