// Redis STRLEN command examples in C#

using StackExchange.Redis;

namespace Strlen
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set value for key "sitename"
             * Command: set sitename bigboxcode
             * Result: OK
             */
            bool setResult = rdb.StringSet("sitename", "bigboxcode");

            Console.WriteLine("Command: set sitename bigboxcode | Result: " + setResult);

            /**
             * Get string length when the key is set
             * Command: strlen sitename
             * Result: (integer) 10
             */
            long lenResult = rdb.StringLength("sitename");

            Console.WriteLine("Command: strlen sitename | Result: " + lenResult);

            /**
             * Try getting length of a non-existing key, it will return Zero(0)
             * Command: strlen wrongkey
             * Result: (integer) 0
             */
            lenResult = rdb.StringLength("wrongkey");

            Console.WriteLine("Command: strlen wrongkey | Result: " + lenResult);

            /**
             * Set empty string as value for a key
             * Command: set empkey ""
             * Result: OK
             */
            setResult = rdb.StringSet("empkey", "");

            Console.WriteLine("Command: set empkey \"\" | Result: " + setResult);

            /**
             * Try getting legnth of a key that has empty string storead as value. It will return Zero(0) as the length of the value is Zero(0)
             * Command: strlen empkey
             * Result: (integer) 0
             */
            lenResult = rdb.StringLength("empkey");

            Console.WriteLine("Command: strlen empkey | Result: " + lenResult);

            /**
             * Initate a list and add elements
             * Command: lpush mylist "first list item"
             * Result: (integer) 2
             */
            long listResult = rdb.ListLeftPush("mylist", "first list item");

            Console.WriteLine("Command: lpush mylist \"first list item\" | Result: " + listResult);

            /**
             * Try to apply STRLEN command for the list
             * An error is returned
             * Command: strlen mylist
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lenResult = rdb.StringLength("mylist");

                Console.WriteLine("Command: strlen mylist | Result: " + lenResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: strlen mylist | Error: " + e.Message);
            }
        }
    }
}