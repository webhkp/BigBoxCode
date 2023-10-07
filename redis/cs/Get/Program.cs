using StackExchange.Redis;
using System;

namespace Get
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();


            /**
             * Set a key/value
             *
             * Command: set firstkey "some value"
             * Result: OK
             */
            var setCommandResult = rdb.StringSet("firstkey", "some value");

            Console.WriteLine("Command: set firstkey \"some value\" | Result: " + setCommandResult);


            /**
             * Check the value of key firstkey
             *
             * Command: get firstkey
             * Result: "some value"
             */
            var getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);


            /**
             * Check the value of key wrongkey (which does not exist in database)
             *
             * Command: get wrongkey
             * Result: nil
             */
            getCommandResult = rdb.StringGet("wrongkey");

            Console.WriteLine("Command: get wrongkey | Result: " + getCommandResult);
        }
    }
}