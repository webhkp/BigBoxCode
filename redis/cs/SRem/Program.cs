// Redis SREM command examples in C#

using StackExchange.Redis;
using System.Collections.Generic;


namespace SRem
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Add members to set
             *
             * Command: sadd bigboxset nine eight seven six five four three two one
             * Result: (integer) 9
             */
            long saddResult = rdb.SetAdd("bigboxset", new RedisValue[] { "nine", "eight", "seven", "six", "five", "four", "three", "two", "one" });

            Console.WriteLine("Command: sadd bigboxset nine eight seven six five four three two one | Result: " + saddResult);

            /**
             * Check set members
             *
             * Command: smembers bigboxset
             * Result:
             *      1) "nine"
             *      2) "eight"
             *      3) "seven"
             *      4) "six"
             *      5) "five"
             *      6) "four"
             *      7) "three"
             *      8) "two"
             *      9) "one"
             */
            RedisValue[] smembersResult = rdb.SetMembers("bigboxset");

            Console.WriteLine("Command: smembers bigboxset | Result: " + String.Join(",", smembersResult));

            /**
             * Remove set member
             *
             * Command: srem bigboxset eight
             * Result: (integer) 1
             */
            bool sremResult = rdb.SetRemove("bigboxset", "eight");

            Console.WriteLine("Command: srem bigboxset eight | Result: " + sremResult);

            /**
             * Check set members
             *
             * Command: smembers bigboxset
             * Result:
             *      1) "nine"
             *      2) "seven"
             *      3) "six"
             *      4) "five"
             *      5) "four"
             *      6) "three"
             *      7) "two"
             *      8) "one"
             */
            smembersResult = rdb.SetMembers("bigboxset");

            Console.WriteLine("Command: smembers bigboxset | Result: " + String.Join(",", smembersResult));

            /**
             * Remove set members
             *
             * Command: srem bigboxset two four six someunknownitem
             * Result: (integer) 3
             */
            long sremResultMultiple = rdb.SetRemove("bigboxset", new RedisValue[] { "two", "four", "six", "someunknownitem" });

            Console.WriteLine("Command: srem bigboxset two four six someunknownitem | Result: " + sremResultMultiple);

            /**
             * Check set members
             *
             * Command: smembers bigboxset
             * Result:
             *      1) "nine"
             *      2) "seven"
             *      3) "five"
             *      4) "three"
             *      5) "one"
             */
            smembersResult = rdb.SetMembers("bigboxset");

            Console.WriteLine("Command: smembers bigboxset | Result: " + String.Join(",", smembersResult));

            /**
             * Try to remove from a non existing key
             * SREM handles it as an empty array, and returns zero(0)
             *
             * Command: srem nonexistingkey a b c
             * Result: (integer) 0
             */
            sremResultMultiple = rdb.SetRemove("nonexistingkey", new RedisValue[] { "a", "b", "c" });

            Console.WriteLine("Command: srem nonexistingkey a b c | Result: " + sremResultMultiple);

            /**
             * Set a string
             *
             * Command: set bigboxstr "some string value for demo"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some string value for demo");

            Console.WriteLine("Command: set bigboxstr \"some string value for demo\" | Result: " + setResult);

            /**
             * Try to use SREM on a string
             * Returns error ans SREM can only be used a set
             *
             * Command: srem bigboxstr "some"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                sremResult = rdb.SetRemove("bigboxstr", "some");

                Console.WriteLine("Command: srem bigboxstr \"some\" | Result: " + sremResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: srem bigboxstr \"some\" | Error: " + e.Message);
            }
        }
    }
}