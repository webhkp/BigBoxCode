// Redis HGET command examples in C#

using StackExchange.Redis;

namespace Hget
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
             * Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States"
             * Result: (integer) 5
             */
            HashEntry[] hashData = new HashEntry[] {
                new HashEntry("street", "2855 W 76 Country Blvd"),
                new HashEntry("city", "Branson"),
                new HashEntry("state", "Mississippi"),
                new HashEntry("zip", "65616"),
                new HashEntry("country", "United States")
            };
            rdb.HashSet("customer:99:address", hashData);

            Console.WriteLine("Command: hset customer:99:address street \"2855 W 76 Country Blvd\" city Branson state Mississippi zip 65616 country \"United States\"");

            /**
             * Check zip field of the hash
             *
             * Command: hget customer:99:address zip
             * Result: "65616"
             */
            RedisValue hgetResult = rdb.HashGet("customer:99:address", "zip");
            Console.WriteLine("Command: hget customer:99:address zip | Result: " + hgetResult);

            /**
             * Check state field of the hash
             *
             * Command: hget customer:99:address state
             * Result: "Mississippi"
             */
            hgetResult = rdb.HashGet("customer:99:address", "state");

            Console.WriteLine("Command: hget customer:99:address state | Result: " + hgetResult);

            /**
             * Try to get value of a field that does not exist
             * We get (nil)
             *
             * Command: hget customer:99:address nonexistingfield
             * Result: (nil)
             */
            hgetResult = rdb.HashGet("customer:99:address", "nonexistingfield");

            Console.WriteLine("Command: hget customer:99:address nonexistingfield | Result: " + hgetResult);

            /**
             * Try to get field value from a non existing hash
             * We get (nil)
             *
             * Command: hget nonexistinghash somefield
             * Result: (nil)
             */
            hgetResult = rdb.HashGet("nonexistinghash", "somefield");

            Console.WriteLine("Command: hget nonexistinghash somefield | Result: " + hgetResult);


            /**
             * Set a string value
             *
             * Command: set bigboxstr "some string in the box"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some string in the box");

            Console.WriteLine("Command: set bigboxstr \"some string in the box\" | Result: " + setResult);

            /**
             * Try to use the HGET on a string type of key
             * We get an error
             *
             * Command: hget bigboxstr somefield
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                hgetResult = rdb.HashGet("bigboxstr", "somefield");

                Console.WriteLine("Command: hget bigboxstr somefield | Result: " + hgetResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hget bigboxstr somefield | Error: " + e.Message);
            }
        }
    }
}