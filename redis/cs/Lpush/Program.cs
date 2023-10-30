// Redis LPUSH command examples in C#

using StackExchange.Redis;

namespace Lpush
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Push item to simplelist
             * List is created as it does not already exist
             *
             * Command: lpush simplelist "first item"
             * Result: (integer) 1
             */
            long pushResult = rdb.ListLeftPush("simplelist", "first item");

            Console.WriteLine("Command: lpush simplelist \"first item\" | Result: " + pushResult);

            /**
             * Prepend another element to list
             *
             * Command: lpush simplelist "second item"
             * Result: (integer) 2
             */
            pushResult = rdb.ListLeftPush("simplelist", "second item");

            Console.WriteLine("Command: lpush simplelist \"second item\" | Result: " + pushResult);

                         /**
                          * Check list items with LRANGE
                          *
                          * Command: lrange simplelist 0 -1
                          * Result:
                          *      1) "second item"
                          *      2) "first item"
                          */
            RedisValue[] listItems = rdb.ListRange("simplelist", 0, -1);

            Console.WriteLine("Command: lrange simplelist 0 -1 | Result: ");

            foreach (var item in listItems)
            {
                Console.WriteLine(item);
            }

            /**
             * Create list and push an item to a new list
             *
             * Command: lpush user:16:cart 986
             * Result: (integer) 1
             */
            pushResult = rdb.ListLeftPush("user:16:cart", "986");

            Console.WriteLine("Command: lpush user:16:cart 986 | Result: " + pushResult);

            /**
             * Prepend item to list
             *
             * Command: lpush user:16:cart 32
             * Result: (integer) 2
             */
            pushResult = rdb.ListLeftPush("user:16:cart", "32");

            Console.WriteLine("Command: lpush user:16:cart 32 | Result: " + pushResult);

            /**
             * Prepend another item
             *
             * Command: lpush user:16:cart 102
             * Result: (integer) 3
             */
            pushResult = rdb.ListLeftPush("user:16:cart", "102");

            Console.WriteLine("Command: lpush user:16:cart 102 | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "102"
             *      2) "32"
             *      3) "986"
             */
            listItems = rdb.ListRange("user:16:cart", 0, -1);

            Console.WriteLine("Command: lrange user:16:cart 0 -1 | Result:");

            foreach (var item in listItems)
            {
                Console.WriteLine(item);
            }

            /**
             * Prepend multiple times to list
             *
             * Command: lpush user:16:cart 1049 167 348 2055
             * Result: (integer) 7
             */
            pushResult = rdb.ListLeftPush("user:16:cart", new RedisValue[] { "1049", "167", "348", "2055" });

            Console.WriteLine("Command: lpush user:16:cart 1049 167 348 2055 | Result: " + pushResult);

            /**
             * Check the list
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "2055"
             *      2) "348"
             *      3) "167"
             *      4) "1049"
             *      5) "102"
             *      6) "32"
             *      7) "986"
             */
            listItems = rdb.ListRange("user:16:cart", 0, -1);

            Console.WriteLine("Command: lrange user:16:cart 0 -1 | Result:");

            foreach (var item in listItems)
            {
                Console.WriteLine(item);
            }

            /**
             * Set a string value
             *
             * Command: set firstkey "my site"
             * Result: OK
             */
            bool setResult = rdb.StringSet("firstkey", "my site");

            Console.WriteLine("Command: set firstkey \"my site\" | Result: " + setResult);


            /**
             * Try to use lpush on a string type
             * We get an error
             *
             * Command: lpush firstkey "another site"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                pushResult = rdb.ListLeftPush("firstkey", "another site");

                Console.WriteLine("Command: lpush firstkey \"another site\" | Result: " + pushResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lpush firstkey \"another site\" | Error: " + e.Message);
            }
        }
    }
}