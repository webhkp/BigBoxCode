// Redis LMOVE command examples in C#

using StackExchange.Redis;

namespace Llen
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Create list and push element. We are pushing 5 elements to the list
             *
             * Command: rpush bigboxlist one two three four five
             * Result: (integer) 5
             */
            long pushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "one", "two", "three", "four", "five" });

            Console.WriteLine("Command: rpush bigboxlist one two three four five | Result: " + pushResult);

            /**
             * Check length of the list
             *
             * Command: llen bigboxlist
             * Result: (integer) 5
             */
            long listLength = rdb.ListLength("bigboxlist");

            Console.WriteLine("Command: llen bigboxlist | Result: " + listLength);

            /**
             * Use LLEN for an non existing key
             * It returns Zero(0)
             *
             * Command: llen nonexistingkey
             * Result: (integer) 0
             */
            listLength = rdb.ListLength("nonexistingkey");

            Console.WriteLine("Command: llen nonexistingkey | Result: " + listLength);

            /**
             * Set a string key/value
             *
             * Command: set somestrkey "my string value here for test"
             * Result: OK
             */
            bool setResult = rdb.StringSet("somestrkey", "my string value here for test");

            Console.WriteLine("Command: set somestrkey \"my string value here for test\" | Result: " + setResult);

            /**
             * Try to use LLEN command for string type key
             * It returns error which indicates, the type of key is wrong
             *
             * Command: llen somestrkey
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                listLength = rdb.ListLength("somestrkey");

                Console.WriteLine("Command: llen somestrkey | Result: " + listLength);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: llen somestrkey | Error: " + e.Message);
            }
        }
    }
}