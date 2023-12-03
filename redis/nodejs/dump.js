// Redis DUMP command example in JavaScript(NodeJS)

import { createClient } from "redis";

// Create redis client
const redisClient = createClient({
  url: "redis://default:@localhost:6379",
});

redisClient.on("error", (err) =>
  console.log("Error while connecting to Redis", err)
);

// Connect Redis client
await redisClient.connect();

/**
 * Set a string value
 *
 * Command: set bigboxstr "My string value saved in a Big Box"
 * Result: OK
 */
let commandResult = await redisClient.set(
  "bigboxstr",
  "My string value saved in a Big Box"
);

console.log(
  'Command: set bigboxstr "My string value saved in a Big Box" | Result: ' +
    commandResult
);

/**
 * Check string value
 *
 * Command: get bigboxstr
 * Result: "My string value saved in a Big Box"
 */
commandResult = await redisClient.get("bigboxstr");

console.log("Command: get bigboxstr | Result" + commandResult);

/**
 * DUMP string
 *
 * Command: dump bigboxstr
 * Result: "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
 */
commandResult = await redisClient.dump("bigboxstr");

console.log("Command: dump bigboxstr | Result: " + commandResult);

/**
 * Add items to list
 *
 * Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789
 * Result: (integer) 7
 */
commandResult = await redisClient.rPush(
  "bigboxlist",
  "abc123",
  "def234",
  "ghi345",
  "jkl456",
  "mno567",
  "pqrst678",
  "uvwxyz789"
);

console.log(
  "Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789 | Result: " +
    commandResult
);

/**
 * Check list items
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "abc123"
 *      2) "def234"
 *      3) "ghi345"
 *      4) "jkl456"
 *      5) "mno567"
 *      6) "pqrst678"
 *      7) "uvwxyz789"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * DUMP list data
 *
 * Command: dump bigboxlist
 * Result: "\x12\x01\x02@DD\x00\x00\x00\a\x00\x86abc123\a\x86def234\a\x86ghi345\a\x86jkl456\a\x86mno567\a\x88pqrst678\t\x89uvwxyz789\n\xff\x0b\x00\x8b\xca\r \xb8\x1c'\x7f"
 */
commandResult = await redisClient.dump("bigboxlist");

console.log("Command: dump bigboxlist | Result: " + commandResult);

/**
 * Add items to set
 *
 * Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472
 * Result: (integer) 5
 */
commandResult = await redisClient.sAdd(
  "bigboxset",
  "6218014406",
  "1619751279",
  "7858399611",
  "7595030997",
  "9982317472"
);

console.log(
  "Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472 | Result: " +
    commandResult
);

/**
 * Check set items
 *
 * Command: smembers bigboxset
 * Result:
 *      1) "1619751279"
 *      2) "6218014406"
 *      3) "7595030997"
 *      4) "7858399611"
 *      5) "9982317472"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log("Command: smembers bigboxset | Result: ", commandResult);

/**
 * DUMP set data
 *
 * Command: dump bigboxset
 * Result: "\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5"
 */
commandResult = await redisClient.dump("bigboxset");

console.log("Command: dump bigboxset | Result: " + commandResult);

/**
 * Add item to hash
 *
 * Command: hset bigboxhash secret1 3622625569 secret2 5251979648 secret3 7686908197 secret4 0645904521 secret5 8386817336 secret6 2706180686 secret7  7252297879
 * Result: (integer) 7
 */
const hashData = [
  ["secret1", "3622625569"],
  ["secret2", "5251979648"],
  ["secret3", "7686908197"],
  ["secret4", "0645904521"],
  ["secret5", "8386817336"],
  ["secret6", "2706180686"],
  ["secret7", "7252297879"],
];
commandResult = await redisClient.hSet("bigboxhash", hashData);

console.log(
  "Command: hset bigboxhash secret1 3622625569 secret2 5251979648 secret3 7686908197 secret4 0645904521 secret5 8386817336 secret6 2706180686 secret7  7252297879 | Result: " +
    commandResult
);

/**
 * Check hash data
 *
 * Command: hgetall bigboxhash
 * Result:
 *      1) "secret1"
 *      2) "3622625569"
 *      3) "secret2"
 *      4) "5251979648"
 *      5) "secret3"
 *      6) "7686908197"
 *      7) "secret4"
 *      8) "0645904521"
 *      9) "secret5"
 *      10) "8386817336"
 *      11) "secret6"
 *      12) "2706180686"
 *      13) "secret7"
 *      14) "7252297879"
 */
commandResult = await redisClient.hGetAll("bigboxhash");

console.log("Command: hgetall bigboxhash | Result: ", commandResult);

/**
 * DUMP hash data
 *
 * Command: dump bigboxhash
 * Result: "\x10\xc3@i@\x8e\x13\x8e\x00\x00\x00\x0e\x00\x87secret1\b\xf4!\xe1\xec\xd7 \x12\x01\x00\t\xa0\x12\a2\b\xf4\x80\xd9\n9\x01\xe0\x02\x12\x063\b\xf4%\xe9,\xca\xe0\x03\x12\r4\b\x8a0645904521\x0b\xa0:\x065\b\xf48\xad\xe4\xf3\xe0\x03'\x066\b\xf4N\nM\xa1 L\xe0\x00`\x067\b\xf4\x97HE\xb0@%\x01\t\xff\x0b\x00\xea\x15\x94\x95K\xf0\xd7R"
 */
commandResult = await redisClient.dump("bigboxhash");

console.log("Command: dump bigboxhash | Result: " + commandResult);

/**
 * Add item to sorted set
 *
 * Command: zadd bigboxsortedset 1 GM0F1JGPMJ 5 U2M07EJDSB 3 4NBR9A4FMF 2 0X2ZET2CP4 4 LD4X0F70OC
 * Result: (integer) 5
 */
const ssData = [
  {
    score: 1,
    value: "GM0F1JGPMJ",
  },
  {
    score: 5,
    value: "U2M07EJDSB",
  },
  {
    score: 3,
    value: "4NBR9A4FMF",
  },
  {
    score: 2,
    value: "0X2ZET2CP4",
  },
  {
    score: 4,
    value: "LD4X0F70OC",
  },
];
commandResult = await redisClient.zAdd("bigboxsortedset", ssData);

console.log(
  "Command: zadd bigboxsortedset 1 GM0F1JGPMJ 5 U2M07EJDSB 3 4NBR9A4FMF 2 0X2ZET2CP4 4 LD4X0F70OC | Result: " +
    commandResult
);

/**
 * Check sorted set data
 *
 * Command: zrange bigboxsortedset 0 -1
 * Result:
 *      1) "GM0F1JGPMJ"
 *      2) "0X2ZET2CP4"
 *      3) "4NBR9A4FMF"
 *      4) "LD4X0F70OC"
 *      5) "U2M07EJDSB"
 */
commandResult = await redisClient.zRange("bigboxsortedset", 0, -1);

console.log("Command: zrange bigboxsortedset 0 -1 | Result: ", commandResult);

/**
 * DUMP sorted set data
 *
 * Command: dump bigboxsortedset
 * Result: "\x11@MM\x00\x00\x00\n\x00\x8aGM0F1JGPMJ\x0b\x01\x01\x8a0X2ZET2CP4\x0b\x02\x01\x8a4NBR9A4FMF\x0b\x03\x01\x8aLD4X0F70OC\x0b\x04\x01\x8aU2M07EJDSB\x0b\x05\x01\xff\x0b\x00\xba\x0bC\x19\x93[\x0f\xff"
 */
commandResult = await redisClient.dump("bigboxsortedset");

console.log("Command: dump bigboxsortedset | Result: " + commandResult);

/**
 * Try to dump a non existing key
 * We get null
 *
 * Command: dump nonexistingkey
 * Result: (nil)
 */
commandResult = await redisClient.dump("nonexistingkey");

console.log("Command: dump nonexistingkey | Result: " + commandResult);

process.exit(0);
