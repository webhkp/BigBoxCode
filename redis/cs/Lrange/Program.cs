// Redis LRANGE command examples in C#

using StackExchange.Redis;

namespace Lrange
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Create list with 8 items
             *
             * Command: rpush simplelist "first item" "second item" "third" fourth fifth sixth "seventh" eighth
             * Result: (integer) 8
             */
            long listCreateResult = rdb.ListRightPush("simplelist", new RedisValue[] { "first item", "second item", "third", "fourth", "fifth", "sixth", "seventh", "eighth"});

            Console.WriteLine("Command: rpush simplelist \"first item\" \"second item\" \"third\" fourth fifth sixth \"seventh\" eighth | Result: " + listCreateResult);

            /**
             * Get item from list from start to the 5th index
             *
             * Command: lrange simplelist 0 5
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third"
             *      4) "fourth"
             *      5) "fifth"
             *      6) "sixth"
             */
            RedisValue[]  lrangeResult = rdb.ListRange("simplelist", 0, 5);
            Console.WriteLine("Command: lrange simplelist 0 5 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Get list items from start to the end(all items)
             *
             * Command: lrange simplelist 0 -1
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third"
             *      4) "fourth"
             *      5) "fifth"
             *      6) "sixth"
             *      7) "seventh"
             *      8) "eighth"
             */
            lrangeResult = rdb.ListRange("simplelist", 0, -1);

            Console.WriteLine("Command: lrange simplelist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Get list items from 5th index to the end of list
             *
             * Command: lrange simplelist 5 -1
             * Result:
             *      1) "sixth"
             *      2) "seventh"
             *      3) "eighth"
             */
            lrangeResult = rdb.ListRange("simplelist", 5, -1);

            Console.WriteLine("Command: lrange simplelist 5 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Get list items from 5th index(from end) to the last item
             *
             * Command: lrange simplelist -5 -1
             * Result:
             *      1) "fourth"
             *      2) "fifth"
             *      3) "sixth"
             *      4) "seventh"
             *      5) "eighth"
             */
            lrangeResult = rdb.ListRange("simplelist", -5, -1);

            Console.WriteLine("Command: lrange simplelist -5 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Try to get list items with starting index larger that end index
             * We get an empty list
             * Command: lrange simplelist 3 1
             * Result: (empty array)
             */
            lrangeResult = rdb.ListRange("simplelist", 3, 1);

            Console.WriteLine("Command: lrange simplelist 3 1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * When the provided index is out of range, then the command adjusts to the starting or ending index
             *
             * Command: lrange simplelist 5 10000
             * Result:
             *      1) "sixth"
             *      2) "seventh"
             *      3) "eighth"
             */
            lrangeResult = rdb.ListRange("simplelist", 5, 10_000);

            Console.WriteLine("Command: lrange simplelist 5 10000 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * If range is out of range then it is adjusted with the actual index
             *
             * Command: lrange simplelist -99 999
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third"
             *      4) "fourth"
             *      5) "fifth"
             *      6) "sixth"
             *      7) "seventh"
             *      8) "eighth"
             */
            lrangeResult = rdb.ListRange("simplelist", -99, 999);

            Console.WriteLine("Command: lrange simplelist -99 999 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Try to get items from a list that does not exist
             * We get an empty array
             * Command: lrange wronglist 0 -1
             * Result: (empty array)
             */
            lrangeResult = rdb.ListRange("wronglist", 0, -1);

            Console.WriteLine("Command: lrange wronglist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Set a string value
             *
             * Command: set keyone "some value for key one"
             * Result: OK
             */
            bool setResult = rdb.StringSet("keyone", "some value for key one");

            Console.WriteLine("Command: set keyone \"some value for key one\" | Result:" + setResult);

            /**
             * Try to use LRANGE for an element that is not a list
             * We get an error for WRONGTYPE
             *
             * Command: lrange keyone 0 -1
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lrangeResult = rdb.ListRange("keyone", 0, 5);

                Console.WriteLine("Command: lrange keyone 0 -1 | Result:");

                foreach (var item in lrangeResult)
                {
                    Console.WriteLine(item);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lrange keyone 0 -1 | Error: " + e.Message);
            }
        }
    }
}