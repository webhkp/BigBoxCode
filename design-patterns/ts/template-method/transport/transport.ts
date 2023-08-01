// transport.ts

abstract class Transport {
    public abstract createBody(): void;
    public abstract addEngine(): void;
    public abstract addWheel(): void;
    public abstract addWing(): void;

    private addSeat(): void {
        console.log("Adding seats");
    }

    private paint(): void {
        console.log("Painting");
    }

    public build(): void {
        this.createBody();
        this.addEngine();
        this.addWheel();
        this.addWing();
        this.addSeat();
        this.paint();
    }
}

export default Transport;