using StackExchange.Redis;

namespace Append
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Check firstkey, it not exist
             * Command: get firstkey
             * Result: (nil)
             */
            RedisValue getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);

            /**
             * Append "abc" to the firstkey.
             * As firstkey does not already exist, so it will be created and "abc" will be appended to that.
             * After append the length of firstkey value is three(3), so "3" is returned
             * Command: append firstkey "abc"
             * Result: (integer) 3
             */
            long appendCommandResult = rdb.StringAppend("firstkey", "abc");

            Console.WriteLine("Command: append firstkey \"abc\" | Result: " + appendCommandResult);

            /**
             * Check firstkey, we get "abc"
             * Command: get firstkey
             * Result: "abc"
             */
            getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);

            /**
             * Append "def" to firstkey.
             * As firstkey already has "abc" as value, if "def" is appended then firstkey value becomes "abcdef".
             * After append the total length of firstkey value is six(6) so "6" is returned as result.
             * Command: append firstkey "def"
             * Result: (integer) 6
             */
            appendCommandResult = rdb.StringAppend("firstkey", "def");

            Console.WriteLine("Command: append firstkey \"def\" | Result: " + appendCommandResult);

            /**
             * Check firstkey, we get "abcded"
             * Command: get firstkey
             * Result: "abcdef"
             */
            getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);


            /**
             * Check the length of firstkey and we get six(6)
             * Command: strlen firstkey
             * (integer) 6
             */
            long intResult = rdb.StringLength("firstkey");
            Console.WriteLine("Command: strlen firstkey | Result: " + intResult);

            /**
             * Let's check with another key, secondkey, it is not set yet.
             * Command: get secondkey
             * Result: (nil)
             */
            getCommandResult = rdb.StringGet("secondkey");

            Console.WriteLine("Command: get secondkey | Result: " + getCommandResult);

            /**
             * Append a blank string "" to secondkey.
             * secondkey will be create and blank sring "" will be appended to it.
             * As a result the value os second key becomes a blank string "", and length becomes zero(0)
             * Zero(0) is returned as result
             * Command: append secondkey ""
             * Result: (integer) 0
             */
            appendCommandResult = rdb.StringAppend("secondkey", "");

            Console.WriteLine("Command: append secondkey \"\" | Result: " + appendCommandResult);

            /**
             * Check secondkey
             * Command: get secondkey
             * Result: ""
             */
            getCommandResult = rdb.StringGet("secondkey");

            Console.WriteLine("Command: get secondkey | Result: " + getCommandResult);

            /**
             * Check secondkey length
             * Command: strlen secondkey
             * Result: (integer) 0
             */
            intResult = rdb.StringLength("secondkey");

            Console.WriteLine("Command: strlen secondkey | Result: " + intResult);

            /**
             * Create a list
             * Command: lpush mylist abc
             * Result: (integer) 1
             */
            long listCommandResult = rdb.ListLeftPush("mylist", new RedisValue[] { "abc" });


            Console.WriteLine("Command: lpush mylist abc | Result: " + listCommandResult);

            /**
             * Try to append string to the list type. Returns error
             * Command: append mylist 98
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                appendCommandResult = rdb.StringAppend("mylist", "98");

                Console.WriteLine("Command: append mylist 98 | Result: " + appendCommandResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: append mylist 98 | Error: " + e.Message);
            }
        }
    }
}