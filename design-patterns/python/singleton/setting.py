from typing import Any, Dict


class SingletonMeta(type):
    """A metaclass that ensures only one instance of a class is created."""

    _instances: Dict[type, Any] = {}

    def __call__(cls, *args, **kwargs) -> Any:
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class Setting(metaclass=SingletonMeta):
    """A Singleton class to manage settings."""

    def __init__(self) -> None:
        self._props: Dict[str, Any] = {}

    def set(self, key: str, value: Any) -> None:
        """Set a key-value pair in the settings."""
        self._props[key] = value

    def get(self, key: str) -> Any:
        """Get the value associated with a key."""
        return self._props.get(key, None)

    def get_all(self) -> Dict[str, Any]:
        """Return all settings as a dictionary."""
        return self._props


# Demo usage
def main() -> None:
    # Create first setting instance
    setting = Setting()

    setting.set("file_base_path", "/var/log/dd")
    setting.set("app_port", 3000)

    print("First instance settings:")
    print(setting.get_all())

    # Try to create another instance
    setting2 = Setting()

    print("\nSecond instance settings (should be the same):")
    print(setting2.get_all())

    # Check if both instances are the same
    print("\nAre both instances the same?", setting is setting2)


if __name__ == "__main__":
    main()
