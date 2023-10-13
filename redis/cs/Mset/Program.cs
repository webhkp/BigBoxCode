// Redis MSET command examples in C#

using StackExchange.Redis;

namespace Mset
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();


            /**
             * Use MSET to set multiple values
             *
             * Command: mset firstkey "first val" secondkey "second val" lastkey "last val"
             * Result: OK
             */
            KeyValuePair<RedisKey, RedisValue>[] keyValues = new KeyValuePair<RedisKey, RedisValue>[]
                    {
                        new KeyValuePair<RedisKey, RedisValue>("firstkey", "first val"),
                        new KeyValuePair<RedisKey, RedisValue>("secondkey", "second val"),
                        new KeyValuePair<RedisKey, RedisValue>("lastkey", "last val")
                    };
            bool setCommandResult = rdb.StringSet(keyValues);
            Console.WriteLine("Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Result: " + setCommandResult);


            /**
             * Check value, and it is set properly
             *
             * Command: get firstkey
             * Result: "first val"
             */
            RedisValue getCommandResult = rdb.StringGet("firstkey");
            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);


            /**
             * Get multiple values with MGET to check the values
             *
             * Command: mget firstkey secondkey lastkey
             * Result:
             *      1) "first val"
             *      2) "second val"
             *      3) "last val"
             */
            RedisValue[] resultList = rdb.StringGet(new RedisKey[] { "firstkey", "secondkey", "lastkey" });
            Console.WriteLine("Command: mget firstkey secondkey lastkey | Result: ");

            foreach (var item in resultList)
            {
                Console.WriteLine(item);
            }


            /**
             * Set some new and existing keys
             *
             * Command: mset newkey "some new value" firstkey "first value changed"
             * Result: OK
             */
            keyValues = new KeyValuePair<RedisKey, RedisValue>[]
                    {
                        new KeyValuePair<RedisKey, RedisValue>("newkey", "some new value"),
                        new KeyValuePair<RedisKey, RedisValue>("firstkey", "first value changed"),
                    };
            setCommandResult = rdb.StringSet(keyValues);

            Console.WriteLine("Command: mset newkey \"some new value\" firstkey \"first value changed\" | Result: " + setCommandResult);


            /**
             * New key is set
             *
             * Command: get newkey
             * Result: "some new value"
             */
            getCommandResult = rdb.StringGet("newkey");

            Console.WriteLine("Command: get newkey | Result: " + getCommandResult);


            /**
             * Existing key value is replaced
             *
             * Command: get firstkey
             * Result: "first value changed"
             */
            getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);


            /**
             * Set the same key multiple times in the same MSET command
             *
             * Command: mset commonkey "my val 1" commonkey "changed common val"
             * Result: OK
             */
            keyValues = new KeyValuePair<RedisKey, RedisValue>[]
                    {
                        new KeyValuePair<RedisKey, RedisValue>("commonkey", "my val 1"),
                        new KeyValuePair<RedisKey, RedisValue>("commonkey", "changed common val"),
                    };
            setCommandResult = rdb.StringSet(keyValues);

            Console.WriteLine("Command: commonkey \"my val 1\" commonkey \"changed common val\" | Result: " + setCommandResult);


            /**
             * Check the value of commonkey
             * The value which was set later is kept
             *
             * Command: get commonkey
             * Result: "changed common val"
             */
            getCommandResult = rdb.StringGet("commonkey");

            Console.WriteLine("Command: get commonkey | Result: " + getCommandResult);
        }
    }
}