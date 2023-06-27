// cdn-cache-handler.ts

import CacheHandler from "./cache-handler";
import Data, { DATA_TYPE } from "./data";

class CdnCacheHandler extends CacheHandler {
    constructor(nextCacheHandler: CacheHandler | null) {
        super(nextCacheHandler);
    }

    public handleRequest(data: Data): void {
        if (data.getType() == DATA_TYPE.CSS || data.getType() == DATA_TYPE.JAVASCRIPT) {
            console.log("Caching file \'" + data.getKey() + "\' in CDN");
        }
        else if (this.nextCacheHandler != null) {
            this.nextCacheHandler.handleRequest(data);
        }
    }
}

export default CdnCacheHandler;