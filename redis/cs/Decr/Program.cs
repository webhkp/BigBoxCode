using StackExchange.Redis;

namespace Decr
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set the value of user:23:score key to 85
             *
             * Command: set user:23:score 85
             * Result: OK
             */
            bool setCommandResult = rdb.StringSet("user:23:score", "85");
            Console.WriteLine("Command: set user:23:score 85 | Result: " + setCommandResult);

            /**
             * decreament value of user:23:score
             *
             * Command: decr user:23:score
             * Result: (integer) 84
             */
            long decrResult = rdb.StringDecrement("user:23:score");

            Console.WriteLine("Command: decr user:23:score | Result: " + decrResult);

            /**
             * Check value of user:23:score key
             *
             * Command: get user:23:score
             * Result: "84"
             */
            RedisValue getCommandResult = rdb.StringGet("user:23:score");
            Console.WriteLine("Command: get user:23:score | Result: " + getCommandResult);

            /**
             * Check type of user:23:score
             *
             * Command: type user:23:score
             * Result: string
             */
            RedisType typeResult = rdb.KeyType("user:23:score");
            Console.WriteLine("Command: type user:23:score | Result: " + typeResult);


            /**
             * Check if some key named "unknownkey" exists
             * it does not exist yet
             *
             * Command: get unknownkey
             * Result: (nil)
             */
            getCommandResult = rdb.StringGet("unknownkey");

            Console.WriteLine("Command: get unknownkey | Result: " + getCommandResult);

            /**
             * Try to decreament the value of "unknownkey" using decr command
             * The value of "unknownkey" is decreamented to 1
             *
             * Command: decr unknownkey
             * Result: (integer) -1
             */
            decrResult = rdb.StringDecrement("unknownkey");

            Console.WriteLine("Command: decr unknownkey | Result: " + decrResult);

            /**
             * Check the value of "unknownkey"
             *
             * Command: get unknownkey
             * Result: "-1"
             */
            getCommandResult = rdb.StringGet("unknownkey");

            Console.WriteLine("Command: get unknownkey | Result: " + getCommandResult);


            /**
             * Set a string vlaue to sitename key
             *
             * Command: set sitename bigboxcode
             * Result: OK
             */
            setCommandResult = rdb.StringSet("sitename", "bigboxcode");

            Console.WriteLine("Command: set sitename bigboxcode | Result: " + setCommandResult);

            /**
             * Try to apply DECR command to sitename
             * We get an error as the value in sitename key is not an integer
             *
             * Command: decr sitename
             * Result: (error) ERR value is not an integer or out of range
             */
            try
            {
                decrResult = rdb.StringDecrement("sitename");

                Console.WriteLine("Command: decr sitename | Result: " + decrResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: decr sitename | Error: " + e.Message);
            }


            /**
             * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
             * Let's set the value of key "mymaxtest" to a value more than that
             *
             * Command: set mymaxtest 9223372036854775810
             * Result: OK
             */
            setCommandResult = rdb.StringSet("mymaxtest", "9223372036854775810");

            Console.WriteLine("Command: set mymaxtest 9223372036854775810 | Result: " + setCommandResult);

            /**
             * Let's decreament the vlaue of "mymaxtest"
             * We get an error
             *
             * Command: decr mymaxtest
             * Result: (error) ERR value is not an integer or out of range
             */
            try
            {
                decrResult = rdb.StringDecrement("mymaxtest");

                Console.WriteLine("Command: decr mymaxtest | Result: " + decrResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: decr mymaxtest | Error: " + e.Message);
            }


            /**
             * Min value allowed as 64-bit int is -9,223,372,036,854,775,808
             * Lets set a value close to that, -9,223,372,036,854,775,807
             *
             * Command: set mymintest  -9223372036854775807
             * Result: OK
             */
            setCommandResult = rdb.StringSet("mymintest", "-9223372036854775807");

            Console.WriteLine("Command: set mymintest  -9223372036854775807 | Result: " + setCommandResult);

            /**
             * Try to decr the value, it will work as it is still in range
             *
             * Command: decr mymintest
             * Result: (integer) -9223372036854775808
             */
            decrResult = rdb.StringDecrement("mymintest");

            Console.WriteLine("Command: decr mymintest | Result: " + decrResult);

            /**
             * If we try to decrease once again we get error
             *
             * Command: decr mymintest
             * Result: (error) ERR increment or decrement would overflow
             */
            try
            {
                decrResult = rdb.StringDecrement("mymintest");

                Console.WriteLine("Command: decr mymintest | Result: " + decrResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: decr mymintest | Error: " + e.Message);
            }
        }
    }
}