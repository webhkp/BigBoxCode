// Redis HGETAll command examples in C#

using StackExchange.Redis;

namespace HGetAll
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set some has fields usign HSET
             *
             * Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States"
             * Result: (integer) 6
             */
            HashEntry[] hashData = new HashEntry[] {
                new HashEntry("street", "5342 Hollister Ave"),
                new HashEntry("city", "Santa Barbara"),
                new HashEntry("state", "California"),
                new HashEntry("zip", "93111"),
                new HashEntry("phone", "(805) 845-0111"),
                new HashEntry("country", "United States")
            };
            rdb.HashSet("customer:1099:address", hashData);

            Console.WriteLine("Command: hset customer:1099:address street \"5342 Hollister Ave\" city \"Santa Barbara\" state California zip 93111 phone \"(805) 845-0111\" country \"United States\"");

            /**
             * Get all field/value of the hash
             *
             * Command: hgetall customer:1099:address
             * Result:
             *          1) "street"
             *          2) "5342 Hollister Ave"
             *          3) "city"
             *          4) "Santa Barbara"
             *          5) "state"
             *          6) "California"
             *          7) "zip"
             *          8) "93111"
             *          9) "phone"
             *          10) "(805) 845-0111"
             *          11) "country"
             *          12) "United States"
             */
            HashEntry[] hgetAllResult = rdb.HashGetAll("customer:1099:address");

            Console.WriteLine("Command: hgetall customer:1099:address | Result: " + string.Join(", ", hgetAllResult));

            /**
             * Try to use HGETALL on a non existing key
             * we get (empty array)
             *
             * Command: hgetall somenonexistingkey
             * Result: (empty array)
             */
            hgetAllResult = rdb.HashGetAll("nonexistinghash");

            Console.WriteLine("Command: hgetall somenonexistingkey | Result: " + string.Join(", ", hgetAllResult));

            /**
             * Set a string value
             *
             * Command: set bigboxstr "some string in the box"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some string in the box");
            Console.WriteLine("Command: set bigboxstr \"some string in the box\" | Result: " + setResult);

            /**
             * Try to use the HGETALL on a string type of key
             * We get an error
             *
             * Command: hgetall bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                hgetAllResult = rdb.HashGetAll("bigboxstr");

                Console.WriteLine("Command: hgetall bigboxstr | Result: " + hgetAllResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hgetall bigboxstr | Error: " + e.Message);
            }
        }
    }
}