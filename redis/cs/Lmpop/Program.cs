// Redis LMPOP command examples in C#

using StackExchange.Redis;

namespace Lmpop
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Create list "bigboxlist" and push items
             *
             * Command: rpush bigboxlist "big list item 1" "big list item 2" "big list item 3" "big lits item 4" "big list item 5"
             * Result: (integer) 5
             */
            long rpushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "big list item 1", "big list item 2", "big list item 3", "big lits item 4", "big list item 5" });

            Console.WriteLine("Command: rpush bigboxlist \"big list item 1\" \"big list item 2\" \"big list item 3\" \"big lits item 4\" \"big list item 5\" | Result: " + rpushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "big list item 1"
             *      2) "big list item 2"
             *      3) "big list item 3"
             *      4) "big lits item 4"
             *      5) "big list item 5"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Create and push items in "smallboxlist"
             *
             * Command: rpush smallboxlist "small list item 1" "small list item 2" "small list item 3"
             * Result: (integer) 3
             */
            rpushResult = rdb.ListRightPush("smallboxlist", new RedisValue[] { "small list item 1", "small list item 2", "small list item 3" });

            Console.WriteLine("Command: rpush smallboxlist \"small list item 1\" \"small list item 2\" \"small list item 3\" | Result: " + rpushResult);

            /**
             * check item from list
             *
             * Command: lrange smallboxlist 0 -1
             * Result:
             *     1) "small list item 1"
             *     2) "small list item 2"
             *     3) "small list item 3"
             */
            lrangeResult = rdb.ListRange("smallboxlist", 0, -1);

            Console.WriteLine("Command: lrange smallboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));


            /**
             * Use LMPOP on bigboxlist and pop item form left
             *
             * Command: lmpop 1 bigboxlist LEFT
             * Result:
             *     1) "bigboxlist"
             *     2) 1) "big list item 1"
             */
            var lmpopResult = rdb.ListLeftPop(new RedisKey[] { "bigboxlist" }, 1);

            Console.WriteLine("Command: lmpop 1 bigboxlist LEFT | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));

            /**
             * Pop 2 items from the LEFT of bigboxlist
             *
             * Command: lmpop 1 bigboxlist LEFT count 2
             * Result:
             *     1) "bigboxlist"
             *     2)      1) "big list item 2"
             *             2) "big list item 3"
             */
            lmpopResult = rdb.ListLeftPop(new RedisKey[] { "bigboxlist" }, 2);

            Console.WriteLine("Command: lmpop 1 bigboxlist LEFT count 2 | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));

            /**
             * Try to pop items from any of bigboxlist or smallboxlist
             * Items popped from bigboxlist as this list still has item
             *
             * Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
             * Result:
             *     1) "bigboxlist"
             *     2)      1) "big lits item 4"
             *             2) "big list item 5"
             */
            lmpopResult = rdb.ListLeftPop(new RedisKey[] { "bigboxlist", "smallboxlist" }, 2);

            Console.WriteLine("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));

            /**
             * Try to pop again from any of bigbostlist or smallboxlist
             * Items poped from smallboxlist, as there is no item in bigboxlist
             *
             * Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
             * Result:
             *     1) "smallboxlist"
             *     2)      1) "small list item 1"
             *             2) "small list item 2"
             *             3) "small list item 3"
             */
            lmpopResult = rdb.ListLeftPop(new RedisKey[] { "bigboxlist", "smallboxlist" }, 5);

            Console.WriteLine("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));

            /**
             * Try to pop from a non existing list
             * It returns (nil)
             *
             * Command: lmpop 1 nonexistinglist LEFT count 5
             * Result: (nil)
             */
            lmpopResult = rdb.ListLeftPop(new RedisKey[] { "nonexistinglist" }, 5);

            Console.WriteLine("Command: lmpop 1 nonexistinglist LEFT count 5 | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));

            /**
             * Push some items in bigboxlist for continuing the test
             * Command: rpush bigboxlist "item a" "item b" "item c" "item d"
             * Result: (integer) 4
             */
            rpushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "item a", "item b", "item c", "item d", "item e", "item f", "item g", "item h" });

            Console.WriteLine("Command: rpush bigboxlist \"item a\" \"item b\" \"item c\" \"item d\" | Result: " + rpushResult);

            /**
             * Try to pop item from any of a non existing list or bigboxlist
             * items popped from bigboxlist and the non existing list is ignored
             * Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5
             * Result:
             *         1) "bigboxlist"
             *         2)      1) "item a"
             *                 2) "item b"
             *                 3) "item c"
             *                 4) "item d"
             */
            lmpopResult = rdb.ListLeftPop(new RedisKey[] { "nonexistinglist", "bigboxlist" }, 5);

            Console.WriteLine("Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5 | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));

            /**
             * Set a string value
             *
             * Command: set bigboxstr "My big box string"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "My big box string");

            Console.WriteLine("Command: set bigboxstr \"My big box string\" | Result: " + setResult);

            /**
             * Try to pop from a string item
             * It returns an error
             * Command: lmpop 1 bigboxstr right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lmpopResult = rdb.ListRightPop(new RedisKey[] { "bigboxstr" }, 1);

                Console.WriteLine("Command: lmpop 1 bigboxstr right | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lmpop 1 bigboxstr right | Error: " + e.Message);
            }


            /**
             * Try to pop items from a string and a list
             * we get an error as the string is the first item and the command tries to pop items from the string
             *
             * Command: lmpop 2 bigboxstr bigboxlist right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lmpopResult = rdb.ListRightPop(new RedisKey[] { "bigboxstr", "bigboxlist" }, 1);

                Console.WriteLine("Command: lmpop 2 bigboxstr bigboxlist right | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lmpop 2 bigboxstr bigboxlist right | Error: " + e.Message);
            }

            /**
             * Try to pop items from a list and string
             * we get data if the list is non empty
             *
             * Command: lmpop 2 bigboxlist bigboxstr right
             * Result:
             *      1) "bigboxlist"
             *      2)      1) "big list item 5"
             */
            try
            {
                lmpopResult = rdb.ListRightPop(new RedisKey[] { "bigboxlist", "bigboxstr" }, 1);

                Console.WriteLine("Command: lmpop 2 bigboxlist bigboxstr right | Result: key={0} || value: {1}", lmpopResult.Key, string.Join(",", lmpopResult.Values));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lmpop 2 bigboxlist bigboxstr right | Error: " + e.Message);
            }
        }
    }
}