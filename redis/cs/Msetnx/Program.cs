using StackExchange.Redis;

namespace Msetnx
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();


            /**
             * Set 2 values if they do not already exist. Both are set successfully
             *
             * Command: msetnx firstkey "first value" secondkey "second value"
             * Result: (integer) 1
             */
            KeyValuePair<RedisKey, RedisValue>[] keyValues = new KeyValuePair<RedisKey, RedisValue>[]
                    {
                        new KeyValuePair<RedisKey, RedisValue>("firstkey", "first val"),
                        new KeyValuePair<RedisKey, RedisValue>("secondkey", "second val"),
                    };
            bool setCommandResult = rdb.StringSet(keyValues, When.NotExists);

            Console.WriteLine("Command: msetnx firstkey \"first value\" secondkey \"second value\" | Result: " + setCommandResult);

            /**
             * Try to get values for 3 keys
             *
             * Command: mget firstkey secondkey
             * Result:
             *      1) "my first value"
             *      2) "second value"
             */
            RedisValue[] resultList = rdb.StringGet(new RedisKey[] { "firstkey", "secondkey" });

            Console.WriteLine("Command: mget firstkey secondkey | Result: ");

            foreach (var item in resultList)
            {
                Console.WriteLine(item);
            }

            /**
             * Set 2 values. Returns 0 as "firstkey" already exists
             *
             * Command: msetnx newkey "new value" firstkey "changed first value"
             * Result: (integer) 0
             */
            keyValues = new KeyValuePair<RedisKey, RedisValue>[]
                    {
                        new KeyValuePair<RedisKey, RedisValue>("newkey", "new val"),
                        new KeyValuePair<RedisKey, RedisValue>("firstkey", "changed first value"),
                    };
            setCommandResult = rdb.StringSet(keyValues, When.NotExists);

            Console.WriteLine("Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Result: " + setCommandResult);


            /**
             * Check value, and it is not set
             *
             * Command: get newkey
             * Result: (nil)
             */
            RedisValue getCommandResult = rdb.StringGet("newkey");
            Console.WriteLine("Command: get newkey | Result: " + getCommandResult);

            /**
             * Check firstkey, and it has old value
             *
             * Command: get firstkey
             * Result: "first value"
             */
            getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);

            /**
             * Pass same key multiple times
             *
             * Command: msetnx newkey "new value" newkey "another new value"
             * Result: (integer) 1
             */
            keyValues = new KeyValuePair<RedisKey, RedisValue>[]
                    {
                        new KeyValuePair<RedisKey, RedisValue>("newkey", "new value"),
                        new KeyValuePair<RedisKey, RedisValue>("newkey", "another new value"),
                    };
            setCommandResult = rdb.StringSet(keyValues, When.NotExists);

            Console.WriteLine("Command: msetnx newkey \"new value\" newkey \"another new value\" | Result: " + setCommandResult);

            /**
             * newkey has the value that was set/provided later
             *
             * Command: get newkey
             * Result: "another new value"
             */
            getCommandResult = rdb.StringGet("newkey");

            Console.WriteLine("Command: get newkey | Result: " + getCommandResult);

        }
    }
}