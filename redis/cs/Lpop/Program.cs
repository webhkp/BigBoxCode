// Redis LPOP command examples in C#

using StackExchange.Redis;

namespace Lpop
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Push elements and create list
             *
             * Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
             * Result: (integer) 5
             */
            long rpushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "Item A", "Item B", "Item C", "Item D", "Item E" });

            Console.WriteLine("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: " + rpushResult);

            /**
             * Check item list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *          1) "Item A"
             *          2) "Item B"
             *          3) "Item C"
             *          4) "Item D"
             *          5) "Item E"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Pop 1 item from HEAD
             *
             * Command: lpop bigboxlist
             * Result: "Item A"
             */
            RedisValue lpopResult = rdb.ListLeftPop("bigboxlist");

            Console.WriteLine("Command: lpop bigboxlist | Result: " + lpopResult);

            /**
             * Pop 2 items from HEAD
             *
             * Command: lpop bigboxlist 2
             * Result:
             *         1) "Item B"
             *         2) "Item C"
             */
            RedisValue[] lpopResults = rdb.ListLeftPop("bigboxlist", 2);

            Console.WriteLine("Command: lpop bigboxlist 2 | Result: " + string.Join(", ", lpopResults));

            /**
             * Try to pass negative value for the count
             * We get an error message
             *
             * Command: lpop bigboxlist -2
             * Result: (error) ERR value is out of range, must be positive
             */
            try
            {
                lpopResults = rdb.ListLeftPop("bigboxlist", -2);

                Console.WriteLine("Command: lpop bigboxlist -2 | Result: " + string.Join(", ", lpopResults));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lpop bigboxlist -2 | Error: " + e.Message);
            }

            /**
             * Pass Zero(0) as count
             * Empty array is returned
             *
             * Command: lpop bigboxlist 0
             * Result: (empty array)
             */
            lpopResult = rdb.ListLeftPop("bigboxlist", 0);

            Console.WriteLine("Command: lpop bigboxlist 0 | Result: " + lpopResult);

            /**
             * Try to pop 5 items from list
             * The list has only 2 items
             * 2 items are popped and command is successful
             *
             * Command: lpop bigboxlist 5
             * Result:
             *         1) "Item D"
             *         2) "Item E"
             */
            lpopResults = rdb.ListLeftPop("bigboxlist", 5);

            Console.WriteLine("Command: lpop bigboxlist 5 | Result: " + string.Join(", ", lpopResults));

            /**
             * Check if list exits after all items are popped
             * List does not exist any more
             *
             * Command: exists bigboxlist
             * Result: (integer) 0
             */
            bool existsResult = rdb.KeyExists("bigboxlist");

            Console.WriteLine("Command: exists bigboxlist | Result: " + existsResult);

            /**
             * Try to pop from a non existing list
             * returns (nil)
             *
             * Command: lpop bigboxlist
             * Result: (nil)
             */
            lpopResult = rdb.ListLeftPop("bigboxlist");

            Console.WriteLine("Command: lpop bigboxlist | Result: " + lpopResult);

            /**
             * Create an string value
             *
             * Command: set bigboxstr "my string value here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "my string value here");

            Console.WriteLine("Command: set bigboxstr \"my string value here\" | Result: " + setResult);


            /**
             * Try to apply LPOP on the string
             * Returns an error message
             *
             * Command: lpop bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lpopResult = rdb.ListLeftPop("bigboxstr");

                Console.WriteLine("Command: lpop bigboxstr | Result: " + lpopResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lpop bigboxstr | Error: " + e.Message);
            }
        }
    }
}