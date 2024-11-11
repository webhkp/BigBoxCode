from abc import ABC, abstractmethod
from typing import List


# FileSystem Interface
class FileSystem(ABC):
    @abstractmethod
    def print(self, indent: int = 0) -> None:
        pass


# File Class
class File(FileSystem):
    def __init__(self, name: str, size: int):
        self.name = name
        self.size = size

    def print(self, indent: int = 0) -> None:
        print(" " * indent + f"File: {self.name} (Size: {self.size} KB)")


# Directory Class
class Directory(FileSystem):
    def __init__(self, name: str):
        self.name = name
        self.contents: List[FileSystemEntity] = []

    def print(self, indent: int = 0) -> None:
        print(" " * indent + f"Directory: {self.name}")
        for entity in self.contents:
            entity.print(indent + 2)

    def add_entity(self, entity: FileSystem) -> None:
        self.contents.append(entity)

    def remove_entity(self, entity: FileSystem) -> None:
        if entity in self.contents:
            self.contents.remove(entity)


# Demo
def main():
    # Create some files
    file1 = File("file1.txt", 128)
    file2 = File("file2.txt", 1024)
    file3 = File("file3.txt", 2048)

    # Create a directory and add files
    dir1 = Directory("dir1")
    dir1.add_entity(file1)
    dir1.add_entity(file2)

    # Create a nested directory
    nested_dir = Directory("nested_dir")
    nested_dir.add_entity(file3)

    # Add the nested directory to dir1
    dir1.add_entity(nested_dir)

    # Create the root directory and add dir1 to it
    root_dir = Directory("root")
    root_dir.add_entity(dir1)
    root_dir.add_entity(File("root_file.txt", 256))

    # Print the entire file structure
    root_dir.print()


if __name__ == "__main__":
    main()
