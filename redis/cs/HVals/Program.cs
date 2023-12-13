// Redis HVALS command examples in C#

using StackExchange.Redis;

namespace HVals
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set hash field/value
             *
             * Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868
             * Result: (integer) 8
             */
            HashEntry[] hashData = new HashEntry[] {
                new HashEntry("street", "6414 Losee Rd"),
            new HashEntry("city", "North Las Vegas"),
            new HashEntry("state", "North Carolina"),
            new HashEntry("zip", "89086"),
            new HashEntry("phone", "(702) 399-9939"),
            new HashEntry("country", "United States"),
            new HashEntry("latitude", "36.27704"),
            new HashEntry("longitude", "-115.115868"),
        };
            rdb.HashSet("customer:1786:address", hashData);

            Console.WriteLine("Command: hset customer:1786:address street \"6414 Losee Rd\" city \"North Las Vegas\" state \"North Carolina\" zip \"89086\" phone \"(702) 399-9939\" country \"United States\" latutude 36.27704 longitude -115.115868");

            /**
             * Check hash full data
             *
             * Command: hgetall customer:1786:address
             * Result:
             *         1) "street"
             *         2) "6414 Losee Rd"
             *         3) "city"
             *         4) "North Las Vegas"
             *         5) "state"
             *         6) "North Carolina"
             *         7) "zip"
             *         8) "89086"
             *         9) "phone"
             *         10) "(702) 399-9939"
             *         11) "country"
             *         12) "United States"
             *         13) "latutude"
             *         14) "36.27704"
             *         15) "longitude"
             *         16) "-115.115868"
             */
            HashEntry[] hgetAllResult = rdb.HashGetAll("customer:1786:address");

            Console.WriteLine("Command: hgetall customer:1099:address | Result: " + String.Join(", ", hgetAllResult));

            /**
             * Get all the values of hash
             *
             * Command: hvals customer:1786:address
             * Result:
             *         1) "street"
             *         2) "city"
             *         3) "state"
             *         4) "zip"
             *         5) "phone"
             *         6) "country"
             *         7) "latutude"
             *         8) "longitude"
             */
            RedisValue[] hvalsResult = rdb.HashValues("customer:1786:address");

            Console.WriteLine("Command: hvals customer:1099:address | Result: " + String.Join(", ", hvalsResult));

            /**
             * Use HVALS on a non existing key
             * We get (empty list)
             *
             * Command: hvals nonexistingkey
             * Result: (empty array)
             */
            hvalsResult = rdb.HashValues("nonexistingkey");

            Console.WriteLine("Command: hvals nonexistingkey | Result: " + String.Join(", ", hvalsResult));

            /**
             * Set string value
             *
             * Command: set bigboxstr "some stiring value for HVALS command testing"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some stiring value for HVALS command testing");

            Console.WriteLine("Command: set bigboxstr \"some stiring value for HVALS command testing\" | Result: " + setResult);

            /**
             * Try to use HVALS on a hash
             * We get an error
             *
             * Command: hvals bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                hvalsResult = rdb.HashValues("bigboxstr");

                Console.WriteLine("Command: hvals bigboxstr | Result: " + String.Join(", ", hvalsResult));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hvals bigboxstr | Error: " + e.Message);
            }
        }
    }
}