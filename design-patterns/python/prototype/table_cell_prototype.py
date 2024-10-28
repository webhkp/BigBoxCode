import copy


class CellPrototype:
    def clone(self, row: int = None, column: int = None) -> "Prototype":
        clone_obj = copy.deepcopy(self)

        if row is not None:
            clone_obj.row = row

        if column is not None:
            clone_obj.column = column

        return clone_obj


class Cell(CellPrototype):
    def __init__(self, row: int, column: int) -> None:
        self.row = row
        self.column = column

        # Default values
        self.height: int = 10
        self.width: int = 100
        self.content: str | None = None
        self.background = "FFFFFF"
        self.text_color = "000000"

    def __str__(self):
        return f"""Cell: (
            row={self.row}, 
            column={self.column}, 
            height: {self.height}, 
            width: {self.width}, 
            content: {self.content}, 
            background: {self.background}, 
            text_color: {self.text_color})"""


# Demo usage
def main():
    # Create Cell object
    cell = Cell(1, 1)
    cell.setContent = "Original cell content"
    cell.setBackground = "808080"

    print("Cell object: ", cell)

    # Clone Cell object
    cell_clone = cell.clone()

    print("Cell clone(without any change): ", cell_clone)

    # Change values in clone
    cell_clone.row = 1
    cell_clone.column = 2
    cell_clone.content = "Clone cell"
    cell_clone.background = "008000"
    cell_clone.text_color = "FFFFFF"

    print("Clone object after changing:", cell_clone)

    # Check the original cell object
    print("Original cell object: ", cell)

    # Second clone with custom row and column
    second_clone = cell.clone(row=2, column=2)
    second_clone.content = "Second clone"

    print("Second clone: ", second_clone)


if __name__ == "__main__":
    main()
