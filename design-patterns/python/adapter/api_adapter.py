from abc import ABC, abstractmethod


# File Operation interface
class FileOp(ABC):
    @abstractmethod
    def read_file(self) -> str:
        pass

    @abstractmethod
    def write_file(self, input: str) -> None:
        pass


# File operation class implementing File operation interface
class FileOperation:
    def __init__(self, file_name: str) -> None:
        self.file_name = file_name

    def read_file(self) -> str:
        print(f"Reading from file: {self.file_name}")

        return "Some dummy response read from file"

    def write_file(self, input: str) -> None:
        print(f"Write to file {self.file_name}: {input}")


# Api interface
class Api(ABC):
    @abstractmethod
    def fetch_data(self) -> str:
        pass

    @abstractmethod
    def send_data(self, data: str) -> None:
        pass


# Native api class implementing Api interface
class NativeApi(Api):
    def __init__(self) -> None:
        self.host = "http://localhost"

    def fetch_data(self) -> str:
        print("Fetching dat from native api")

        return "data read from native api"

    def send_data(self, data: str) -> None:
        print(f"Sending data to Native API: {data}")


# Third part api implementing the Api interface
class ThirdPartyApi(Api):
    def __init__(self, host: str) -> None:
        self.host = host

    def fetch_data(self) -> str:
        print(f"Fetching data from third part api: {self.host}")

        return "data from third part api"

    def send_data(self, data: str) -> None:
        print(f"Sending data to third party API: {data}")


# Adapter to adapt the File opeation
# to the Api operations
class FileAdapter(Api):
    def __init__(self, file_op: FileOp) -> None:
        self.file_op = file_op

    def fetch_data(self) -> str:
        return self.file_op.read_file()

    def send_data(self, data: str) -> None:
        self.file_op.write_file(data)


# Demo usage
def main():
    # make a call to third part API for testing
    third_part_api = ThirdPartyApi("https://somethirdpartapi.com")
    third_part_api.fetch_data()
    third_part_api.send_data("1234")

    # Make a call to the file via FileAdapter
    file_op = FileOperation("abc.txt")
    file_adapter = FileAdapter(file_op)
    file_adapter.fetch_data()
    file_adapter.send_data("ABCDEF")


if __name__ == "__main__":
    main()
