// Redis GETDEL command examples in C#

using StackExchange.Redis;

namespace Getdel
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set value for "sitename"
             *
             * Command: set sitename bigboxcode
             * Result: OK
             */
            var setCcommandResult = rdb.StringSet("sitename", "bigboxcode");

            Console.WriteLine("Command: set sitename bigboxcode | Result: " + setCcommandResult);


            /**
             * Get and delete key (and value) of "sitename"
             *
             * Command: getdel sitename
             * Result: "bigboxcode"
             */
            var getCommandResult = rdb.StringGetDelete("sitename");

            Console.WriteLine("Command: getdel sitename | Result: " + getCommandResult);


            /**
             * Check if "sitename" still exists
             * It will not exist as already deleted in the last step
             *
             * Command: exists sitename
             * Result: (integer) 0
             */
            var existsCommandResult = rdb.KeyExists("sitename");

            Console.WriteLine("Command: exists sitename | Result: " + existsCommandResult);


            /**
             * Try to apply GETDEL  for a key that does not exist
             *
             * Command: getdel wrongkey
             * Result: (nil)
             */
            getCommandResult = rdb.StringGetDelete("wrongkey");

            Console.WriteLine("Command: getdel wrongkey | Result: " + getCommandResult);


            /**
             * Create a list and add items
             *
             * Command: rpush users "John Done" "Second User" "Last User"
             * Result: (integer) 3
             */
            var listCommandResult = rdb.ListRightPush("users", new RedisValue[] { "John Done", "Second User", "Last User" });

            Console.WriteLine("Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Result: " + listCommandResult);


            /**
             * Try to apply GETDEL to data that is not of type string (list in this case)
             * Will return an error, as GETDEL can be applied for string data type only
             *
             * Command: getdel users
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                getCommandResult = rdb.StringGetDelete("users");

                Console.WriteLine("Command: getdel users | Result: " + getCommandResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: getdel users | Error: " + e.Message);
            }
        }
    }
}