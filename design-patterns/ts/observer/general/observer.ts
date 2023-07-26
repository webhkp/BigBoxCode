// observer.ts

import Subject from "./subject";


abstract class Observer {
    protected subject: Subject | null = null;

    abstract sendUpdate(): void;
}

export default Observer;