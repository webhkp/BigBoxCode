// Redis LREM command examples in C#

using StackExchange.Redis;

namespace Lrem
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Create list and push items
             *
             * Command: rpush bigboxlist B I G B O X C O D E B I O
             * Result: (integer) 13
             */
            long rpushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O" });

            Console.WriteLine("Command: rpush bigboxlist B I G B O X C O D E B I O | Result: " + rpushResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"
             *         2) "I"
             *         3) "G"
             *         4) "B"
             *         5) "O"
             *         6) "X"
             *         7) "C"
             *         8) "O"
             *         9) "D"
             *         10) "E"
             *         11) "B"
             *         12) "I"
             *         13) "O"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Remove 2 occurrences of "B" starting from the Left/HEAD
             *
             * Command: lrem bigboxlist 2 "B"
             * Result: (integer) 2
             */
            long lremResult = rdb.ListRemove("bigboxlist", "B", 2);

            Console.WriteLine("Command: lrem bigboxlist 2 \"B\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "I"
             *         2) "G"
             *         3) "O"
             *         4) "X"
             *         5) "C"
             *         6) "O"
             *         7) "D"
             *         8) "E"
             *         9) "B"
             *         10) "I"
             *         11) "O"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Remove 2 occurrences of "O" starting from the Right/TAIL
             *
             * Command: lrem bigboxlist -2 "O"
             * Result: (integer) 2
             */
            lremResult = rdb.ListRemove("bigboxlist", "O", -2);

            Console.WriteLine("Command: lrem bigboxlist -2 \"O\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "I"
             *         2) "G"
             *         3) "O"
             *         4) "X"
             *         5) "C"
             *         6) "D"
             *         7) "E"
             *         8) "B"
             *         9) "I"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Remove all occurrences of "I"
             *
             * Command: lrem bigboxlist 0 "I"
             * Result: (integer) 2
             */
            lremResult = rdb.ListRemove("bigboxlist", "I", 0);

            Console.WriteLine("Command: lrem bigboxlist 0 \"I\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "G"
             *         2) "O"
             *         3) "X"
             *         4) "C"
             *         5) "D"
             *         6) "E"
             *         7) "B"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Try to remove 1000 occurrences of "B" starting from the HEAD
             * Only 1 occurrence removed as there was only 1 "B" in the list
             *
             * Command: lrem bigboxlist 1000 "B"
             * Result: (integer) 1
             */
            lremResult = rdb.ListRemove("bigboxlist", "B", 1000);

            Console.WriteLine("Command: lrem bigboxlist 1000 \"B\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "G"
             *         2) "O"
             *         3) "X"
             *         4) "C"
             *         5) "D"
             *         6) "E"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Try to delete a non existing item
             *
             * Command: lrem bigboxlist 0 "non existing item"
             * Result: (integer) 0
             */
            lremResult = rdb.ListRemove("bigboxlist", "non existing item", 0);

            Console.WriteLine("Command: lrem bigboxlist 0 \"non existing item\" | Result: " + lremResult);

            /**
             * Try to delete from a non existing list
             * It is treated as an empty list and returns zero(0)
             *
             * Command: lrem nonexistinglist 0 A
             * Result: (integer) 0
             */
            lremResult = rdb.ListRemove("nonexistinglist", "A", 0);

            Console.WriteLine("Command: lrem nonexistinglist 0 A | Result: " + lremResult);

            /**
             * Set some string value
             *
             * Command: set bigboxstr "Some str value"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "Some str value");

            Console.WriteLine("Command: set bigboxstr \"Some str value\" | Result: " + setResult);

            /**
             * Try to use LREM on a string
             * We get an error
             *
             * Command: lrem bigboxstr 0 "S"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lremResult = rdb.ListRemove("bigboxstr", "S", 0);

                Console.WriteLine("Command: lrem bigboxstr 0 \"S\" | Result: " + lremResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lrem bigboxstr 0 \"S\" | Error: " + e.Message);
            }
        }
    }
}