// table-cell.ts

class TableCell {
    private width: number;
    private text: string = '';

    constructor(width: number) {
        this.width = width;
    }

    setText(text: string) {
        this.text = text;
    }

    draw() {
        console.log("Drawing cell : width = " + this.width + " | text = " + this.text);
    }
}

export default TableCell;