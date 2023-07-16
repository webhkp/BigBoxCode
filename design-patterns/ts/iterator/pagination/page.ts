// page.ts

class Page {
    private pageNumber: number = 0;
    private path: string | null = null;

    getNumber(): number {
        return this.pageNumber;
    }

    setNumber(pageNumber: number): void {
        this.pageNumber = pageNumber;
    }

    getPath(): string {
        if (this.path == null) {
            return "/page/" + this.pageNumber;
        }
        return this.path;
    }

    setPath(path: string): void {
        this.path = path;
    }
}

export default Page;