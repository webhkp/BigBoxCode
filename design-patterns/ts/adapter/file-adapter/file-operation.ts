// file-operation.ts

import FileOp from './file-op';

class FileOperation implements FileOp {
    readFile(): string {
        console.log("Reading from file");
        return "some dummy response read from file";
    }

    writeFile(input: string): void {
        console.log("Writing to file: " + input);
    }
}

export default FileOperation;