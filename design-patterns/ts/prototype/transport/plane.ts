// plane.ts

import Prototype from "./prototype";


class Plane implements Prototype {
    model: string;
    color: string;

    constructor(model: string, color: string) {
        this.model = model;
        this.color = color;
    }

    clone(): Prototype {
        return new Plane(this.model, this.color);
    }

    toString(): string {
        return "Model: " + this.model + " | Color: " + this.color;
    }
}

export default Plane;