// FileAdapter.java

package com.bigboxcode.designpattern.adapter.api;

public class FileAdapter implements Api {

    private final File file;

    public FileAdapter(File file) {
        this.file = file;
    }

    @Override
    public String fetchData() {
        // May perform additional operation or processing
        // before or after data is fetched

        return file.readFile();
    }

    @Override
    public void sendData(String data) {
        // May perform additional operation or processing
        // before or after data is written to file

        file.writeFile(data);
    }
}
