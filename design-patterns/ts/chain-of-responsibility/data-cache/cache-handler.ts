// cache-handler.ts

import Data from "./data";

abstract class CacheHandler {
    public nextCacheHandler: CacheHandler | null;

    constructor(nextCacheHandler: CacheHandler | null) {
        this.nextCacheHandler = nextCacheHandler;
    }

    abstract handleRequest(data: Data): void;
}

export default CacheHandler;