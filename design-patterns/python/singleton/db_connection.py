from typing import Optional


class DbConnectionSingleton:
    """Dabase base connection singleton using Global Object Pattern"""

    _db_instance: Optional["DbConnectionSingleton"] = None

    def __new__(
        cls, url: str, port: str, username: str, password: str
    ) -> "DbConnectionSingleton":
        if cls._db_instance is None:
            cls._db_instance = super(DbConnectionSingleton, cls).__new__(cls)
        return cls._db_instance

    def __init__(self, url: str, port: str, username: str, password: str) -> None:
        if not hasattr(self, "initialized"):
            self.initialized = True

            self.url: str = url
            self.port: str = port
            self.username: str = username
            self.password: str = password

    def print_connection_details(self) -> None:
        print(f"URL: {self.url}")
        print(f"Port: {self.port}")
        print(f"Username: {self.username}")
        print(f"Password: {self.password}")

    def execute_query(self, query: str) -> None:
        print(f"Executing query: {query}")


# Demo usage
# Main function for demo
def main() -> None:
    # First connection attempt
    db_connection: DbConnectionSingleton = DbConnectionSingleton(
        "localhost", "5432", "postgres", "secret*pass"
    )
    print("First Connection Details:")
    db_connection.print_connection_details()

    # Second connection attempt (should return the same instance)
    second_db_connection: DbConnectionSingleton = DbConnectionSingleton(
        "192.168.55.55", "1234", "postgres2", "secret*pass2"
    )
    print("\n\nSecond Connection Details:")
    second_db_connection.print_connection_details()

    # Checking if both references are pointing to the same instance
    print(
        f"\nIs the first connection same as the second? {db_connection is second_db_connection}"
    )


if __name__ == "__main__":
    main()
