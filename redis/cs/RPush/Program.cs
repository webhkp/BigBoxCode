// Redis RPUSH command examples in C#

using StackExchange.Redis;

namespace RPush
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();


            /**
             * Push item to bigboxlist
             * list does not exist yet,
             * so first list is created then item pushed into it
             *
             * Command: rpush bigboxlist "first item"
             * Result: (integer) 1
             */
            long pushResult = rdb.ListRightPush("bigboxlist", "first item");

            Console.WriteLine("Command: rpush bigboxlist \"first item\" | Result: " + pushResult);

            /**
             * Push item to list
             *
             * Command: rpush bigboxlist "second item"
             * Result: (integer) 2
             */
            pushResult = rdb.ListRightPush("bigboxlist", "second item");

            Console.WriteLine("Command: rpush bigboxlist \"second item\" | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "first item"
             *      2) "second item"
             */
            RedisValue[] listItems = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result: " + String.Join(", ", listItems));

            /**
             * Push item to user card for user id 16
             * The key we are using here is user:16:cart
             *
             * Command: rpush user:16:cart 986
             * Result: (integer) 1
             */
            pushResult = rdb.ListRightPush("user:16:cart", "986");

            Console.WriteLine("Command: rpush user:16:cart 986 | Result: " + pushResult);

            /**
             * Push another item
             *
             * Command: rpush user:16:cart 32
             * Result: (integer) 2
             */
            pushResult = rdb.ListRightPush("user:16:cart", "32");

            Console.WriteLine("Command: rpush user:16:cart 32 | Result: " + pushResult);

            /**
             * Push another item to list
             *
             * Command: rpush user:16:cart 102
             * Result: (integer) 3
             */
            pushResult = rdb.ListRightPush("user:16:cart", "102");

            Console.WriteLine("Command: rpush user:16:cart 102 | Result: " + pushResult);

            /**
             * Check list item
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "986"
             *      2) "32"
             *      3) "102"
             */
            listItems = rdb.ListRange("user:16:cart", 0, -1);

            Console.WriteLine("Command: lrange user:16:cart 0 -1 | Result:" + String.Join(", ", listItems));

            /**
             * Push multiple items to list
             *
             * Command: rpush user:16:cart 1049 167 348 2055
             * Result: (integer) 7
             */
            pushResult = rdb.ListRightPush("user:16:cart", new RedisValue[] { "1049", "167", "348", "2055" });

            Console.WriteLine("Command: rpush user:16:cart 1049 167 348 2055 | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "986"
             *      2) "32"
             *      3) "102"
             *      4) "1049"
             *      5) "167"
             *      6) "348"
             *      7) "2055"
             */
            listItems = rdb.ListRange("user:16:cart", 0, -1);

            Console.WriteLine("Command: lrange user:16:cart 0 -1 | Result:" + String.Join(", ", listItems));

            /**
             * Create a new string type key
             *
             * Command: set bigboxstr "test string here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "test string here");

            Console.WriteLine("Command: set bigboxstr \"test string here\" | Result: " + setResult);

            /**
             * Try to use RPUSH command on a string
             * We get an error as the type does not match
             *
             * Command: rpush bigboxstr "changed string here"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                pushResult = rdb.ListRightPush("bigboxstr", "another site");

                Console.WriteLine("Command: rpush bigboxstr \"another site\" | Result: " + pushResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: rpush bigboxstr \"another site\" | Error: " + e.Message);
            }
        }
    }
}