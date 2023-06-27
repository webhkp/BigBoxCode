// demo.ts

import CdnCacheHandler from "./cdn-cache-handler";
import Data, { DATA_TYPE } from "./data";
import DiskCacheHandler from "./disk-cache-handler";
import RedisCacheHandler from "./redis-cache-handler";

const cacheHandler = new DiskCacheHandler(new RedisCacheHandler(new CdnCacheHandler(null)));

const data1 = new Data(DATA_TYPE.DATA, "key1", "ABC320489un3429rn29urn29r82n9jfdn2");
cacheHandler.handleRequest(data1);

const data2 = new Data(DATA_TYPE.CSS, "key2", ".some-class{border: 1px solid red; margin: 10px}");
cacheHandler.handleRequest(data2);
