// Redis HKEYS command examples in C#

using StackExchange.Redis;
using System.Collections.Generic;

namespace HKeys
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
             * Get all the keys of hash
             *
             * Command: hkeys customer:1786:address
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
            RedisValue[] hkeysResult = rdb.HashKeys("customer:1786:address");

            Console.WriteLine("Command: hkeys customer:1099:address | Result: " + String.Join(", ", hkeysResult));

            /**
             * Use HKEYS on a non existing key
             * We get (empty list)
             *
             * Command: hkeys nonexistingkey
             * Result: (empty array)
             */
            hkeysResult = rdb.HashKeys("nonexistingkey");

            Console.WriteLine("Command: hkeys nonexistingkey | Result: " + String.Join(", ", hkeysResult));

            /**
             * Set string value
             *
             * Command: set bigboxstr "some stiring value for HKEYS command testing"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some stiring value for HKEYS command testing");

            Console.WriteLine("Command: set bigboxstr \"some stiring value for HKEYS command testing\" | Result: " + setResult);

            /**
             * Try to use HKEYS on a hash
             * We get an error
             *
             * Command: hkeys bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                hkeysResult = rdb.HashKeys("bigboxstr");

                Console.WriteLine("Command: hkeys bigboxstr | Result: " + String.Join(", ", hkeysResult));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hkeys bigboxstr | Error: " + e.Message);
            }
        }
    }
}