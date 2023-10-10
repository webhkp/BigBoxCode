using StackExchange.Redis;

namespace Getex
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();


            /**
             * Set value for "sitename" key
             *
             * Command: set sitename "bigboxcode"
             * Result: OK
             */
            var setCommandResult = rdb.StringSet("sitename", "bigboxcode");

            Console.WriteLine("Command: set sitename \"bigboxcode\" | Result: " + setCommandResult);


            /**
             * Use the command without any expire part
             *
             * Command: getex sitename
             * Result: "bigboxcode"
             */
            var getCommandResult = rdb.StringGetSetExpiry("sitename", null);

            Console.WriteLine("Command: getex sitename | Result: " + getCommandResult);


            /**
             * Check TTL, and we get -1 as no expire time is set yet
             *
             * Command: ttl sitename
             * Result: (integer) -1
             */
            var ttlResult = rdb.KeyTimeToLive("sitename");

            Console.WriteLine("Command: ttl sitename | Result: " + ttlResult);


            /**
             * Set 10 seconds expire time while getting get value back
             *
             * Command: getex sitename ex 10
             * Result: "bigboxcode"
             */
            getCommandResult = rdb.StringGetSetExpiry("sitename", new TimeSpan(0, 0, 10));

            Console.WriteLine("Command: getex sitename ex 10 | Result: " + getCommandResult);


            /**
             * Check TTL now, there should be some TTL(if checked within 10 seconds)
             *
             * Command: ttl sitename
             * Result: (integer) 10
             */
            ttlResult = rdb.KeyTimeToLive("sitename");

            Console.WriteLine("Command: ttl sitename | Result: " + ttlResult);


            // Sleep for 10 seconds
            Console.WriteLine("Sleep 10 sec");
            Thread.Sleep(10 * 1000);


            /**
             * Check after 10 seconds. The key has expired
             *
             * Command: get sitename
             * Result: (nil)
             */
            getCommandResult = rdb.StringGet("sitename");

            Console.WriteLine("Command: get sitename | Result: " + getCommandResult);

            /**
             * Set value for a key
             *
             * Command: set sitename bigboxcode
             * Result: OK
             */
            setCommandResult = rdb.StringSet("sitename", "bigboxcode");

            Console.WriteLine("Command: set sitename bigboxcode | Result: " + setCommandResult);


            /**
             * Set 120 seconds expire time while getting the value
             *
             * Command: getex sitename ex 120
             * Result: "bigboxcode"
             */
            getCommandResult = rdb.StringGetSetExpiry("sitename", new TimeSpan(0, 0, 120));

            Console.WriteLine("Command: getex sitename ex 120 | Result: " + getCommandResult);


            /**
             * Check TTL, there should be some TTL (if checked within 120 seconds)
             * Command: ttl sitename
             * Result: (integer) 117
             */
            ttlResult = rdb.KeyTimeToLive("sitename");

            Console.WriteLine("Command: ttl sitename | Result: " + ttlResult);


            /**
             * Try getting value and set expire time for a key that does not exist. We get nil as the ke does not exist
             * Command: getex wrongkey ex 360
             * Result: (nil)
             */
            getCommandResult = rdb.StringGetSetExpiry("wrongkey", new TimeSpan(0, 0, 360));

            Console.WriteLine("Command: getex wrongkey ex 360 | Result: " + getCommandResult);

        }
    }
}