// Redis LINSERT command examples in C#

using StackExchange.Redis;

namespace Linsert
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Push some element in the list
             *
             * Command: rpush bigboxlist one two three four five one testA two testB testC
             * Result: (integer) 10
             */
            long rpushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "one", "two", "three", "four", "five", "one", "testA", "two", "testB", "testC" });

            Console.WriteLine("Command: rpush bigboxlist one two three four five one testA two testB testC | Result: " + rpushResult);

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
             *      6) "one"
             *      7) "testA"
             *      8) "two"
             *      9) "testB"
             *      10) "testC"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);
            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Insert new element after "one"
             *
             * Command: linsert bigboxlist after one "new element after one"
             * Result: (integer) 11
             */
            long linsertResult = rdb.ListInsertAfter("bigboxlist", "one", "new element after one");

            Console.WriteLine("Command: linsert bigboxlist after one \"new element after one\" | Result: " + linsertResult);

            /**
             * Check the list. The new item is after one
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "one"
             *      2) "new element after one"
             *      3) "two"
             *      4) "three"
             *      5) "four"
             *      6) "five"
             *      7) "one"
             *      8) "testA"
             *      9) "two"
             *      10) "testB"
             *      11) "testC"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Insert before the item "one"
             *
             * Command: linsert bigboxlist before one "new element before one"
             * Result: (integer) 12
             */
            linsertResult = rdb.ListInsertBefore("bigboxlist", "one", "new element before one");

            Console.WriteLine("Command: linsert bigboxlist before one \"new element before one\" | Result: " + linsertResult);

            /**
             * Check the list. The new item is inserted before "one"
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "new element before one"
             *      2) "one"
             *      3) "new element after one"
             *      4) "two"
             *      5) "three"
             *      6) "four"
             *      7) "five"
             *      8) "one"
             *      9) "testA"
             *      10) "two"
             *      11) "testB"
             *      12) "testC"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Insert before "testC"
             *
             * Command: linsert bigboxlist before testC "new element before testC"
             * Result: (integer) 13
             */
            linsertResult = rdb.ListInsertBefore("bigboxlist", "testC", "new element before testC");

            Console.WriteLine("Command: linsert bigboxlist before testC \"new element before testC\" | Result: " + linsertResult);

            /**
             * Check list, the new inserted item is there
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "new element before one"
             *      2) "one"
             *      3) "new element after one"
             *      4) "two"
             *      5) "three"
             *      6) "four"
             *      7) "five"
             *      8) "one"
             *      9) "testA"
             *      10) "two"
             *      11) "testB"
             *      12) "new element before testC"
             *      13) "testC"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Try to insert with wrong case of the existing/pivot item
             * We are using "testc" here, but in the list we have "testC"
             * We get -1, as the item is considered as not exist
             *
             * Command: linsert bigboxlist after testc "my new item"
             * Result: (integer) -1
             */
            linsertResult = rdb.ListInsertAfter("bigboxlist", "testc", "my new item");

            Console.WriteLine("Command: linsert bigboxlist after testc \"my new item\" | Result: " + linsertResult);

            /**
             * Try to insert before/after a non existing item
             * We get -1, and the operation failed
             *
             * Command: linsert bigboxlist after "this item does not exist" "my new item"
             * Result: (integer) -1
             */
            linsertResult = rdb.ListInsertAfter("bigboxlist", "this item does not exist", "my new item");

            Console.WriteLine("Command: linsert bigboxlist after \"this item does not exist\" \"my new item\" | Result: " + linsertResult);

            /**
             * Try to use LINSERT for a non existing key
             * We get Zero(0) as result
             *
             * Command: linsert nonexistingkey after somesampleitem "my new item"
             * Result: (integer) 0
             */
            linsertResult = rdb.ListInsertAfter("nonexistingkey", "somesampleitem", "my new item");

            Console.WriteLine("Command: linsert nonexistingkey after somesampleitem \"my new item\" | Result: " + linsertResult);

            /**
             * Set a string value
             *
             * Command: set mystr "some string value"
             * Result: OK
             */
            bool setResult = rdb.StringSet("mystr", "some string value");

            Console.WriteLine("Command: set mystr \"some string value\" | Result: " + setResult);

            /**
             * Try to use LINSERT on a string type key
             * We get an error in response
             *
             * Command: linsert mystr after a "my new item"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                linsertResult = rdb.ListInsertAfter("mystr", "a", "my new item");

                Console.WriteLine("Command: linsert mystr after a \"my new item\" | Result: " + linsertResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: linsert mystr after a \"my new item\" | Error: " + e.Message);
            }
        }
    }
}