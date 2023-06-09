// file.ts

interface FileOp {
    readFile(): string;
    writeFile(input: string): void;
}

export default FileOp;