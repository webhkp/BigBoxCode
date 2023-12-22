// Redis SADD command examples in C#

using StackExchange.Redis;


namespace SMembers
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Add members to set
             * Command: sadd bigboxset one two three "ninety nine" "twelve"
             * Result: (integer) 5
             */
            long saddResult = rdb.SetAdd("bigboxset", new RedisValue[] { "one", "two", "three", "ninety nine", "twelve" });

            Console.WriteLine("Command: sadd bigboxset one two three \"ninety nine\" \"twelve\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "ninety nine"
             *      5) "twelve"
             */
            RedisValue[] smembersResult = rdb.SetMembers("bigboxset");

            Console.WriteLine("Command: smembers bigboxset | Result: " + String.Join(",", smembersResult));

            /**
             * Add some more members
             * existing members are ignored
             * Command: sadd bigboxset "new element" two "ninety nine"
             * Result: (integer) 1
             */
            saddResult = rdb.SetAdd("bigboxset", new RedisValue[] { "new element", "two", "ninety nine" });

            Console.WriteLine("Command: sadd bigboxset \"new element\" two \"ninety nine\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "ninety nine"
             *      5) "twelve"
             *      6) "new element"
             */
            smembersResult = rdb.SetMembers("bigboxset");

            Console.WriteLine("Command: smembers bigboxset | Result: " + String.Join(",", smembersResult));

            /**
             * Use SMEMBERS on a key that does not exist
             * Returns an empty array
             * Command: smembers nonexistingset
             * Result: (empty array)
             */
            smembersResult = rdb.SetMembers("nonexistingset");

            Console.WriteLine("Command: smembers nonexistingset | Result: " + String.Join(",", smembersResult));

            /**
             * Set a string key
             * Command: set bigboxstr 'url of the site is bigboxcode.com'
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "url of the site is bigboxcode.com");

            Console.WriteLine("Command: set bigboxstr 'url of the site is bigboxcode.com' | Result: " + setResult);

            /**
             * Try to use SMEMBERS on a string
             * we get an error
             * Command: smembers bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                smembersResult = rdb.SetMembers("bigboxstr");

                Console.WriteLine("Command: smembers bigboxstr | Result: " + String.Join(",", smembersResult));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: smembers bigboxstr | Error: " + e.Message);
            }

        }
    }
}