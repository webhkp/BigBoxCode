// Redis MGET command examples in C#

using StackExchange.Redis;

namespace Mget
{
    internal class Program
    {
        static void Main(string[] args)
        {

            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();


            /**
             * Set some values
             *
             * Command: set firstkey "my first value"
             * Result: OK
             */
            var setCommandResult = rdb.StringSet("firstkey", "my first value");

            Console.WriteLine("Command: set firstkey \"my first value\" | Result: " + setCommandResult);


            /**
             * Command: set secondkey "bigboxcode"
             * Result: OK
             */
            setCommandResult = rdb.StringSet("secondkey", "bigboxcode");

            Console.WriteLine("Command: set secondkey \"bigboxcode\" | Result: " + setCommandResult);


            /**
             * Command: set user:100 "john"
             * Result: OK
             */
            setCommandResult = rdb.StringSet("user:100", "john");

            Console.WriteLine("Command: set user:100 \"john\" | Result: " + setCommandResult);


            /**
             * Try to get values for 3 keys
             *
             * Command: mget firstkey secondkey user:100
             * Result:
             *  1) "my first value"
             *  2) "bigboxcode"
             *  3) "john"
             */
            var resultList = rdb.StringGet(new RedisKey[] { "firstkey", "secondkey", "user:100" });

            Console.WriteLine("Command: mget firstkey secondkey user:100 | Result: ");

            foreach (var item in resultList)
            {
                Console.WriteLine(item);
            }


            /**
             * We get "nil" if the key deos not exist. Here the "wrongkey" does not exist
             *
             * Command: mget firstkey secondkey wrongkey
             * Result:
             *  1) "my first value"
             *  2) "bigboxcode"
             *  3) (nil)
             */
            resultList = rdb.StringGet(new RedisKey[] { "firstkey", "secondkey", "wrongkey" });

            Console.WriteLine("Command: mget firstkey secondkey wrongkey | Result: ");

            foreach (var item in resultList)
            {
                Console.WriteLine(item);
            }


            /**
             * Here we are provideing "firstkey" multiple times
             *
             * Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey
             * Result:
             *  1) "my first value"
             *  2) "my first value"
             *  3) "bigboxcode"
             *  4) (nil)
             *  5) "john"
             *  6) "my first value"
             */
            resultList = rdb.StringGet(new RedisKey[] { "firstkey", "firstkey", "secondkey", "wrongkey", "user:100", "firstkey" });

            Console.WriteLine("Command: mget firstkey firstkey secondkey wrongkey user:100 firstkeymget firstkey firstkey secondkey wrongkey user:100 firstkey | Result: ");

            foreach (var item in resultList)
            {
                Console.WriteLine(item);
            }

        }
    }
}