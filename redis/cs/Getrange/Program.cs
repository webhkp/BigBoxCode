// Redis GETRANGE command examples in C#

using StackExchange.Redis;

namespace Getrange
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set some string value for description key
             *
             * Command: set description "some long string for GETRANGE testing"
             * Result: OK
             */
            bool setResult = rdb.StringSet("description", "some long string for GETRANGE testing");

            Console.WriteLine("Command: set description \"some long string for GETRANGE testing\" | Result: " + setResult);

            /**
             * Get substring from description from index 0 to 10
             *
             * Command:  getrange description 0 10
             * Result: "some long s"
             */
            RedisValue getRangeResult = rdb.StringGetRange("description", 0, 10);

            Console.WriteLine("Command: getrange description 0 10 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 0 to 1
             *
             * Command:  getrange description 0 1
             * Result: "so"
             */
            getRangeResult = rdb.StringGetRange("description", 0, 1);

            Console.WriteLine("Command: getrange description 0 1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 0 to -1
             *
             * Command:  getrange description 0 -1
             * Result: "some long string for GETRANGE testing"
             */
            getRangeResult = rdb.StringGetRange("description", 0, -1);

            Console.WriteLine("Command: getrange description 0 -1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 20 to -1
             *
             * Command:  getrange description 20 -1
             * Result: " GETRANGE testing"
             */
            getRangeResult = rdb.StringGetRange("description", 20, -1);

            Console.WriteLine("Command: getrange description 20 -1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index -5 to -1
             * Command:  getrange description -5 -1
             * Result: "sting"
             */
            getRangeResult = rdb.StringGetRange("description", -5, -1);

            Console.WriteLine("Command: getrange description -5 -1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 20 to 10
             * It will return empty string as the starting index is of a later element
             * Command:  getrange description 20 10
             * Result: ""
             */
            getRangeResult = rdb.StringGetRange("description", 20, 10);

            Console.WriteLine("Command: getrange description 20 10 | Result: " + getRangeResult);

            /**
             * Get substring from description from index -1 to -5
             * It will return empty string as the starting index is of a later element
             * Command:  getrange description -1 -5
             * Result: ""
             */
            getRangeResult = rdb.StringGetRange("description", -1, -5);

            Console.WriteLine("Command: getrange description -1 -5 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 10 to 2000000
             * As last index is out of range so the * Result will stop at the end of the source string
             * Command:  getrange description 10 2000000
             * Result: "string for GETRANGE testing"
             */
            getRangeResult = rdb.StringGetRange("description", 10, 2000000);

            Console.WriteLine("Command: getrange description 10 2000000 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 5 to 5
             * Command:  getrange description 5 5
             * Result: "l"
             */
            getRangeResult = rdb.StringGetRange("description", 5, 5);

            Console.WriteLine("Command: getrange description 5 5 | Result: " + getRangeResult);

            /**
             * Try to get substring from a key that is not set.
             * Returns an empty string.
             * Command:  getrange wrongkey 10 20
             * Result: ""
             */
            getRangeResult = rdb.StringGetRange("wrongkey", 10, 20);

            Console.WriteLine("Command: getrange wrongkey 10 20 | Result: " + getRangeResult);

            /**
             * Create a list
             * Command:  lpush mylist abcd
             * Result: (integer) 1
             */
            long listCommandResult = rdb.ListLeftPush("mylist", "abcd");

            Console.WriteLine("Command: lpush mylist abcd | Result: " + listCommandResult);

            /**
             * Try to get a substring by index, from the list
             * Command:  getrange mylist 0 2
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                getRangeResult = rdb.StringGetRange("mylist", 0, 10);

                Console.WriteLine("Command: getrange mylist 0 2 | Result: " + getRangeResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: getrange mylist 0 2 | Error: " + e.Message);
            }
        }
    }
}