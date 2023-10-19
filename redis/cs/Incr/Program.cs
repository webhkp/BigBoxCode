// Redis GETEX command examples in C#

using StackExchange.Redis;

namespace Incr
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set the value of total-user-no key to 10
             *
             * Command: set total-user-no 10
             * Result: OK
             */
            bool setResult = rdb.StringSet("total-user-no", "10");
            Console.WriteLine("Command: set total-user-no 10 | Result: " + setResult);

            /**
             * Increment value of total-user-no
             *
             * Command: incr total-user-no
             * Result: (integer) 11
             */
            long incrResult = rdb.StringIncrement("total-user-no");

            Console.WriteLine("Command: incr total-user-no | Result: " + incrResult);
      
            /**
            * Check value of total-user-no key
            * Command: get total-user-no
            * Result: "11"
            */
            RedisValue getResult = rdb.StringGet("total-user-no");
            Console.WriteLine("Command: get total-user-no | Result: " + getResult);

            /**
            * Check type of total-user-no
            * Command: type total-user-no
            * Result: string
            */
            RedisType typeResult = rdb.KeyType("total-user-no");
            Console.WriteLine("Command: type total-user-no | Result: " + typeResult);

            /**
             * Check if some key named "unknownkey" exists
             * it does not exist yet
             * Command: get unknownkey
             * Result: (nil)
             */
            getResult = rdb.StringGet("unknownkey");

            Console.WriteLine("Command: get unknownkey | Result: " + getResult);

            /**
             * Try to increament the value of "unknownkey" using INCR command
             * The value of "unknownkey" is increamented to 1
             * Command: incr unknownkey
             * Result: (integer) 1
             */
            incrResult = rdb.StringIncrement("unknownkey");

            Console.WriteLine("Command: incr unknownkey | Result: " + incrResult);

            /**
             * Check the value of "unknownkey"
             * Command: get unknownkey
             * Result: "1"
             */
            getResult = rdb.StringGet("unknownkey");

            Console.WriteLine("Command: get unknownkey | Result: " + getResult);

            /**
             * Set a string vlaue to sitename key
             * Command: set sitename bigboxcode
             * Result: OK
             */
            setResult = rdb.StringSet("sitename", "bigboxcode");

            Console.WriteLine("Command: set sitename bigboxcode | Result: " + setResult);

            /**
             * Try to apply INCR command to sitename
             * We get an error as the value in sitename key is not an integer
             * Command: incr sitename
             * Result: (error) ERR value is not an integer or out of range
             */
            try
            {
                incrResult = rdb.StringIncrement("sitename");

                Console.WriteLine("Command: incr sitename | Result: " + incrResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: incr sitename | Error: " + e.Message);
            }

            /**
             * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
             * Let's set the value of key "mymaxtest" to a value close to the max value
             * Command: set mymaxtest 9223372036854775806
             * Result: OK
             */
            setResult = rdb.StringSet("mymaxtest", "9223372036854775806");

            Console.WriteLine("Command: set mymaxtest 9223372036854775806 | Result: " + setResult);

            /**
             * Let's increament the vlaue of "mymaxtest"
             * It reaches the max value
             * Command: incr mymaxtest
             * Result: (integer) 9223372036854775807
             */
            incrResult = rdb.StringIncrement("mymaxtest");

            Console.WriteLine("Command: incr mymaxtest | Result: " + incrResult);

            /**
             * Let's try to increase the value of "mymaxtest"
             * We get an error as it goes beyond the max value
             * Command: incr mymaxtest
             * Result: (error) ERR increment or decrement would overflow
             */
            try
            {
                incrResult = rdb.StringIncrement("mymaxtest");

                Console.WriteLine("Command: incr mymaxtest | Result: " + incrResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: incr sitename | Error: " + e.Message);
            }
        }
    }
}