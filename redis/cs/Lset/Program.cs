// Redis LSET command examples in C#

using StackExchange.Redis;

namespace Lset
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Push some value to list
             *
             * Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
             * Result: (integer) 5
             */
            long rpushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "Item A", "Item B", "Item C", "Item D", "Item E" });

            Console.WriteLine("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: " + rpushResult);

            /**
            * Check list
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
             * Set value at index 0
             *
             * Command: lset bigboxlist 0 "Changed item AAAA"
             * Result: OK
             */
            rdb.ListSetByIndex("bigboxlist", 0, "Changed item AAAA");
            Console.WriteLine("Command: lset bigboxlist 0 \"Changed item AAAA\"");

            /**
             * Set value at index 2 of list
             *
             * Command: lset bigboxlist 2 "Changed item CCCC"
             * Result: OK
             */
            rdb.ListSetByIndex("bigboxlist", 2, "Changed item CCCC");

            Console.WriteLine("Command: lset bigboxlist 2 \"Changed item CCCC\"");

            /**
             * Set value at index -1 of list
             *
             * Command: lset bigboxlist -1 "Changed item EEEE"
             * Result: OK
             */
            rdb.ListSetByIndex("bigboxlist", -1, "Changed item EEEE");

            Console.WriteLine("Command: lset bigboxlist -1 \"Changed item EEEE\"");

            /**
             * Check list value
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "Changed item AAAA"
             *         2) "Item B"
             *         3) "Changed item CCCC"
             *         4) "Item D"
             *         5) "Changed item EEEE"
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + string.Join(", ", lrangeResult));

            /**
             * Try to set value at some out of range index
             * error returned
             *
             * Command: lset bigboxlist 200 "Some out of range dummy"
             * Result: (error) ERR index out of range
             */
            try
            {
                rdb.ListSetByIndex("bigboxlist", 200, "Some out of range dummy");

                Console.WriteLine("Command: lset bigboxlist 200 \"Some out of range dummy\"");
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lset bigboxlist 200 \"Some out of range dummy\" | Error: " + e.Message);
            }

            /**
             * Try to set value at some out of range index
             * error returned
             *
             * Command: lset bigboxlist -100 "Another out of range dummy"
             * Result: (error) ERR index out of range
             */
            try
            {
                rdb.ListSetByIndex("bigboxlist", -200, "Another out of range dummy");

                Console.WriteLine("Command: lset bigboxlist -100 \"Another out of range dummy\"");
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lset bigboxlist -100 \"Another out of range dummy\" | Error: " + e.Message);
            }

            /**
             * Try to use LSET on a non existing list
             *  We get an error
             *
             * Command: lset nonexistinglist 0 "My value 101"
             * Result: (error) ERR no such key
             */
            try
            {
                rdb.ListSetByIndex("nonexistinglist", 0, "My value 101");

                Console.WriteLine("Command: lset nonexistinglist 0 \"My value 101\"");
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lset nonexistinglist 0 \"My value 101\" | Error: " + e.Message);
            }

            /**
             * Set some string value
             *
             * Command: set bigboxstr "some string value here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some string value here");
            Console.WriteLine("Command: set bigboxstr \"some string value here\" | Result: " + setResult);

            /**
             * Try to use LSET for a string
             * error returned as LSET can only be used on a list
             *
             * Command: lset bigboxstr 0 "use lset for str"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                rdb.ListSetByIndex("bigboxstr", 0, "use lset for str");

                Console.WriteLine("Command: lset bigboxstr 0 \"use lset for str\"");
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lset bigboxstr 0 \"use lset for str\" | Error: " + e.Message);
            }
        }
    }
}