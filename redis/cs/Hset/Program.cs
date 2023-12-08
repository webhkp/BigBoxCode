// Redis HSET command examples in C#

using StackExchange.Redis;

namespace Hset
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set "street" field of hash
             *
             * Command: hset customer:103:address street "965 Lakeville St"
             * Result: (integer) 1
             */
            bool hsetResult = rdb.HashSet("customer:103:address", "street", "965 Lakeville St");

            Console.WriteLine("Command: hset customer:103:address street \"965 Lakeville St\" | Result: " + hsetResult);

            /**
             * Check hash
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"
             *      2) "965 Lakeville St"
             */
            HashEntry[] hgetAllResult = rdb.HashGetAll("customer:103:address");
            Console.WriteLine("Command: hgetall customer:103:address | Result: " + string.Join(", ", hgetAllResult));

            /**
             * Set multiple fields of the hash
             *
             * Command: hset customer:103:address city Petaluma state California zip 94952 country "United States"
             * Result: (integer) 4
             */
            HashEntry[] hashData = new HashEntry[] {
                new HashEntry("city", "Petaluma"),
                new HashEntry("state", "California"),
                new HashEntry("zip", "94952"),
                new HashEntry("country", "United States")
            };
            rdb.HashSet("customer:103:address", hashData);

            Console.WriteLine("Command: hset customer:103:address city Petaluma state California zip 94952 country \"United States\"");

            /**
             * Check hash
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"     2) "965 Lakeville St"
             *      3) "city"       4) "Petaluma"
             *      5) "state"      6) "California"
             *      7) "zip"        8) "94952"
             *      9) "country"    10) "United States"
             */
            hgetAllResult = rdb.HashGetAll("customer:103:address");

            Console.WriteLine("Command: hgetall customer:103:address | Result: " + string.Join(", ", hgetAllResult));

            /**
             * Set new fields to hash, also update some existing fields
             *
             * Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454
             * Result: (integer) 1
             */
            hashData = new HashEntry[] {
                new HashEntry("city", "hayward"),
                new HashEntry("zip", "94566"),
                new HashEntry("phone", "(503)-445-4454"),
            };

            rdb.HashSet("customer:103:address", hashData);

            Console.WriteLine("Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454");

            /**
             * Check hash
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"     2) "965 Lakeville St"
             *      3) "city"       4) "hayward"
             *      5) "state"      6) "California"
             *      7) "zip"        8) "94566"
             *      9) "country"    10) "United States"
             *      11) "phone"     12) "(503)-445-4454"
             */
            hgetAllResult = rdb.HashGetAll("customer:103:address");

            Console.WriteLine("Command: hgetall customer:103:address | Result: " + string.Join(", ", hgetAllResult));

            /**
             * Try to set the same field multiple times
             * The later provided value is saved
             *
             * Command: hset customer:103:address zip 94555 zip 94599
             * Result: (integer) 0
             */
            hashData = new HashEntry[] {
                new HashEntry("zip", "94555"),
                new HashEntry("zip", "94599"),
            };
            rdb.HashSet("customer:103:address", hashData);

            Console.WriteLine("Command: hset customer:103:address zip 94555 zip 94599");

            /**
             * Check set value
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"     2) "965 Lakeville St"
             *      3) "city"       4) "hayward"
             *      5) "state"      6) "California"
             *      7) "zip"        8) "94599"
             *      9) "country"    10) "United States"
             *      11) "phone"     12) "(503)-445-4454"
             */
            hgetAllResult = rdb.HashGetAll("customer:103:address");

            Console.WriteLine("Command: hgetall customer:103:address | Result: " + string.Join(", ", hgetAllResult));

            /**
             * Get single field of hash
             *
             * Command: hget customer:103:address phone
             * Result: "(503)-445-4454"
             */
            RedisValue hgetResult = rdb.HashGet("customer:103:address", "phone");

            Console.WriteLine("Command: hget customer:103:address phone | Result: " + hgetResult);

            /**
             * Get multiple fields of hash
             *
             * Command: hmget customer:103:address zip phone country
             * Result:
             *      1) "94599"
             *      2) "(503)-445-4454"
             *      3) "United States"
             */
            RedisValue[] hmgetResult = rdb.HashGet("customer:103:address", new RedisValue[] { "zip", "phone", "country" });

            Console.WriteLine("Command: hmget customer:103:address zip phone country | Result: " + string.Join(", ", hmgetResult));

            /**
             * Set a string key
             *
             * Command: set bigboxstr "some string value here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some string value here");

            Console.WriteLine("Command: set bigboxstr \"some string value here\" | Result: " + setResult);

            /**
             * Try to apply HSET on the string data type
             * We get an error
             *
             * Command: hset bigboxstr testfield "test val"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                hsetResult = rdb.HashSet("bigboxstr", "testfield", "test val");

                Console.WriteLine("Command: hset bigboxstr testfield \"test val\" | Result: " + hsetResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hset bigboxstr testfield \"test val\" | Error: " + e.Message);
            }
        }
    }
}