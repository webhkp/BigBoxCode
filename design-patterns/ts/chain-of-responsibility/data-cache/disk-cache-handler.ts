// disk-cache-handler.ts

import CacheHandler from "./cache-handler";
import Data, { DATA_TYPE } from "./data";

class DiskCacheHandler extends CacheHandler {
    constructor(nextCacheHandler: CacheHandler | null) {
        super(nextCacheHandler);
    }

    public handleRequest(data: Data): void {
        if (data.getType() == DATA_TYPE.DATA && data.getData().length > 1024) {
            console.log("Caching data \'" + data.getKey() + "\' in Disk");
        }
        else if (this.nextCacheHandler != null) {
            this.nextCacheHandler.handleRequest(data);
        }
    }
}

export default DiskCacheHandler;