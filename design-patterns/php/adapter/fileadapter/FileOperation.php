<?php
// FileOperation

namespace BigBoxCode\DesignPattern\Adapter\FileAdapter;


class FileOperation implements FileOp {
    public function readFile(): string {
        echo "Reading from file\n";

        return "some dummy response read from file";
    }

    public function writeFile(string $input): void {
        echo "Writing to file: " . $input . "\n";
    }
}