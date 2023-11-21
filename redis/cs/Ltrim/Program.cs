// Redis LTRIM command examples in C#

using StackExchange.Redis;

namespace Ltrim
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Push items and create list
             * Command: rpush bigboxlist B I G B O X C O D E B I O
             * Result: (integer) 13
             */
            long rpushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O" });

            Console.WriteLine("Command: rpush bigboxlist B I G B O X C O D E B I O | Result: " + rpushResult);

            /**
             * Check list
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"  2) "I"  3) "G"  4) "B"  5) "O"  6) "X"  7) "C"  8) "O"  9) "D"  10) "E"  11) "B"  12) "I"  13) "O"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Trim items outside of index 3 to the end
             * Command: ltrim bigboxlist 3 -1
             * Result: OK
             */
             rdb.ListTrim("bigboxlist", 3, -1);

            Console.WriteLine("Command: ltrim bigboxlist 3 -1");

            /**
             * Check list. Initial 3 items are deleted
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"  8) "B"  9) "I"  10) "O"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Keep items from index 0 to 6 and delete others
             * Command: ltrim bigboxlist 0 6
             * Result: OK
             */
            rdb.ListTrim("bigboxlist", 0, 6);

            Console.WriteLine("Command: ltrim bigboxlist 0 6");

            /**
             * Check list
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Try to trim by keeping items from index 3 to 100
             * Max index in existing list is 6. So it will use 6 instead of 100
             * Command: ltrim bigboxlist 3 100
             * Result: OK
             */
            rdb.ListTrim("bigboxlist", 3, 100);

            Console.WriteLine("Command: ltrim bigboxlist 3 100");

            /**
             * Check list
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "C"  2) "O"  3) "D"  4) "E"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Provide ltrim indexes where start index is larger
             * This will empty the list
             * Command: ltrim bigboxlist 2 1
             * Result: OK
             */
            rdb.ListTrim("bigboxlist", 2, 1);

            Console.WriteLine("Command: ltrim bigboxlist 2 1");

            /**
             * Check list, the list is empty now
             * Command: lrange bigboxlist 0 -1
             * Result: (empty array)
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Try to trim a list that does not exist
             * It will return OK
             * Command: ltrim nonexistinglist 0 1
             * Result: OK
             */
            rdb.ListTrim("bigboxlist", 0, 1);

            Console.WriteLine("Command: ltrim nonexistinglist 0 1");

            /**
             * Set a string
             * Command: set bigboxstr "Some string for test"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "Some string for test");

            Console.WriteLine("Command: set bigboxstr \"Some string for test\" | Result: " + setResult);

            /**
             * Try to use LTRIM on a string
             * we get an error
             * Command: ltrim bigboxstr 0 1
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                rdb.ListTrim("bigboxstr", 0, 1);

                Console.WriteLine("Command: ltrim bigboxstr 0 1");
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: ltrim bigboxstr 0 1 | Error: " + e.Message);
            }
        }
    }
}