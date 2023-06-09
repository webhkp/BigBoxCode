// file-adapter.ts

import Api from "./api";
import FileOp from "./file-op";


class FileAdapter implements Api {
    private fileOp: FileOp;

    constructor(fileOp: FileOp) {
        this.fileOp = fileOp;
    }

    fetchData(): string {
        return this.fileOp.readFile();
    }

    public sendData(data: string) {
        this.fileOp.writeFile(data);
    }
}

export default FileAdapter;