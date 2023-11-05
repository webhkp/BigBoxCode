// Redis LINDEX command examples in C#

using StackExchange.Redis;

namespace Lindex
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
             * Command: rpush bigboxlist one two three four five "test a" "test b" "test c" "second last item" "last item"
             * Result: (integer) 10
             */
            long pushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "one", "two", "three", "four", "five", "test a", "test b", "test c", "second last item", "last item" });

            Console.WriteLine("Command: rpush bigboxlist one two three four five \"test a\" \"test b\" \"test c\" \"second last item\" \"last item\" | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "four"
             *      5) "five"
             *      6) "test a"
             *      7) "test b"
             *      8) "test c"
             *      9) "second last item"
             *      10) "last item"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Get list item at index Zero(0)
             *
             * Command: lindex bigboxlist 0
             * Result: "one"
             */
            RedisValue lindexResult = rdb.ListGetByIndex("bigboxlist", 0);

            Console.WriteLine("Command: lindex bigboxlist 0 | Result: " + lindexResult);

            /**
             * Get list item at index One(1)
             *
             * Command: lindex bigboxlist 1
             * Result: "two"
             */
            lindexResult = rdb.ListGetByIndex("bigboxlist", 1);

            Console.WriteLine("Command: lindex bigboxlist 1 | Result: " + lindexResult);

            /**
             * Get list item at index Five(5)
             *
             * Command: lindex bigboxlist 5
             * Result: "test a"
             */
            lindexResult = rdb.ListGetByIndex("bigboxlist", 5);

            Console.WriteLine("Command: lindex bigboxlist 5 | Result: " + lindexResult);

            /**
             * Get list item at index Negative One(-1)
             * The last item in list
             *
             * Command: lindex bigboxlist -1
             * Result: "last item"
             */
            lindexResult = rdb.ListGetByIndex("bigboxlist", -1);

            Console.WriteLine("Command: lindex bigboxlist -1 | Result: " + lindexResult);

            /**
             * Get list item at index Negative Two(-2)
             * The second last item in list
             *
             * Command: lindex bigboxlist -2
             * Result: "second last item"
             */
            lindexResult = rdb.ListGetByIndex("bigboxlist", -2);

            Console.WriteLine("Command: lindex bigboxlist -2 | Result: " + lindexResult);

            /**
             * Try to get item at index out of index
             * Returns (nil), if index is out of range
             *
             * Command: lindex bigboxlist 100000000
             * Result: (nil)
             */
            lindexResult = rdb.ListGetByIndex("bigboxlist", 100000000);

            Console.WriteLine("Command: lindex bigboxlist 100000000 | Result: " + lindexResult);

            /**
             * Try to get item at index out of index
             * Returns (nil), if index is out of range
             *
             * Command: lindex bigboxlist -99999999
             * Result: (nil)
             */
            lindexResult = rdb.ListGetByIndex("bigboxlist", -99999999);

            Console.WriteLine("Command: lindex bigboxlist -99999999 | Result: " + lindexResult);

            /**
             * Try to get list item, when the list does not exist
             * Returns (nil)
             *
             * Command: lindex nonexistingkey 0
             * Result: (nil)
             */
            lindexResult = rdb.ListGetByIndex("nonexistingkey", 0);

            Console.WriteLine("Command: lindex nonexistingkey 0 | Result: " + lindexResult);

            /**
             * Set a string key
             *
             * Command: set firststr "some string value here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("firststr", "some string value here");

            Console.WriteLine("Command: set firststr \"some string value here\" | Result: " + setResult);

            /**
             * Try to use LINDEX for an element that is not a list
             * We get an error in that case
             *
             * Command: lindex firststr 0
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lindexResult = rdb.ListGetByIndex("firststr", 0);

                Console.WriteLine("Command: lindex firststr 0 | Result: " + lindexResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lindex firststr 0 | Error: " + e.Message);
            }
        }
    }
}