from enum import Enum


# Request types
class RequestType(Enum):
    GET = "GET"
    POST = "POST"
    PUT = "PUT"
    PATCH = "PATCH"
    DELETE = "DELETE"


# Reqeust class
class Request:
    def __init__(
        self,
    ) -> None:
        self.url: str | None = None
        self.request_type: RequestType | None = None
        self.header: Dict[str, str] = {}
        self.body: Dict[str, str] = {}

    # Utility function for the class
    # Not directly related to builder pattern
    def validate_request(self) -> None:
        if self.url is None:
            raise ValueError("URL is missing")

        if self.request_type is None:
            raise ValueError("Request type(reqeust_type) is missing")

    def send(self) -> None:
        """Dummy implemnetation for request sending"""

        self.validate_request()

        print("Sending reqeust...")
        print(f"URL: {self.url}")
        print("Headers: ", self.header)
        print("Body: ", self.body)

        # Write the reqeust sending implementation here


# Request builder
class RequestBuilder:
    def __init__(self):
        self.request = Request()

    def set_url(self, url: str) -> "RequestBuilder":
        self.request.url = url
        return self

    def set_type(self, request_type: RequestType) -> "RequestBuilder":
        self.request.request_type = request_type
        return self

    def add_header(self, key: str, value: str) -> "RequestBuilder":
        self.request.header[key] = value
        return self

    def add_body(self, key: str, value: str) -> "RequestBuilder":
        self.request.body[key] = value
        return self

    def build(self) -> Request:
        return self.request


# Usage demo
def main() -> None:
    request_builder = RequestBuilder()
    request = (
        request_builder.set_url("https://bigboxcode.com/request-test")
        .set_type(RequestType.POST)
        .add_header("Content-Type", "application/json")
        .add_header("X-AUTH-TOKEN", "someTokenHere")
        .add_header("X-SOME-HEADER", "someRandomHeaderValueHere")
        .add_body("unit_id", "99")
        .add_body("code", "88C3ABK")
        .build()
    )

    request.send()


if __name__ == "__main__":
    main()
