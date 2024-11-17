from abc import ABC, abstractmethod


# Base Component
class DataExport(ABC):
    @abstractmethod
    def process_data(self) -> None:
        pass


# Concrete Component
class SimpleDataExport(DataExport):
    def process_data(self) -> None:
        print("Processing Data")


# Base Decorator
class DataExportDecorator(DataExport):
    def __init__(self, data_exporter: DataExport):
        self._data_exporter = data_exporter

    def process_data(self) -> None:
        self._data_exporter.process_data()


# Concrete Decorator for CSV
class CsvDataExportDecorator(DataExportDecorator):
    def __init__(self, data_exporter: DataExport):
        super().__init__(data_exporter)

    def process_data(self) -> None:
        super().process_data()
        self.process_csv()

    def process_csv(self) -> None:
        print("Processed data to CSV")


# Concrete Decorator for Excel
class ExcelDataExportDecorator(DataExportDecorator):
    # def __init__(self, data_exporter: DataExport):
    #     super().__init__(data_exporter)

    def process_data(self) -> None:
        super().process_data()
        self.process_excel()

    def process_excel(self) -> None:
        print("Processed data to Excel")


# Concrete Decorator for JSON
class JsonDataExportDecorator(DataExportDecorator):
    def __init__(self, data_exporter: DataExport):
        super().__init__(data_exporter)

    def process_data(self) -> None:
        super().process_data()
        self.process_json()

    def process_json(self) -> None:
        print("Processed data to JSON")


# Demo
def main():
    # CSV Export
    csv_data_export = CsvDataExportDecorator(SimpleDataExport())
    csv_data_export.process_data()

    # Excel Export
    excel_data_export = ExcelDataExportDecorator(SimpleDataExport())
    excel_data_export.process_data()

    # JSON Export
    json_data_export = JsonDataExportDecorator(SimpleDataExport())
    json_data_export.process_data()


if __name__ == "__main__":
    main()
