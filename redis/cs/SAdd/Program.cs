// Redis SADD command examples in C#

using StackExchange.Redis;

namespace SAdd
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Add members to set
             * Command: sadd bigboxset "first item" "second item" "third item" "just another item"
             * Result: (integer) 4
             */
            long saddResult = rdb.SetAdd("bigboxset", new RedisValue[] { "first item", "second item", "third item", "just another item" });

            Console.WriteLine("Command: sadd bigboxset \"first item\" \"second item\" \"third item\" \"just another item\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third item"
             *      4) "just another item"
             */
            RedisValue[] smembersResult = rdb.SetMembers("bigboxset");

            Console.WriteLine("Command: smembers bigboxset | Result: " + String.Join(",", smembersResult));

            /**
             * Add members to set
             * Trying to add some already existing members. The existing members are ignored by the command.
             *
             * Command: sadd bigboxset "second item" "New item one" "first item" "New item two"
             * Result: (integer) 2
             */
            saddResult = rdb.SetAdd("bigboxset", new RedisValue[] { "second item", "New item one", "first item", "New item two" });

            Console.WriteLine("Command: sadd bigboxset \"second item\" \"New item one\" \"first item\" \"New item two\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             *
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third item"
             *      4) "just another item"
             *      5) "New item one"
             *      6) "New item two"
             */
            smembersResult = rdb.SetMembers("bigboxset");

            Console.WriteLine("Command: smembers bigboxset | Result: " + String.Join(",", smembersResult));

            /**
             * Try to add member using SADD, to a non-existing key
             * Key is created and members are added
             *
             * Command: sadd nonexistingset one two three
             * Result: (integer) 3
             */
            saddResult = rdb.SetAdd("nonexistingset", new RedisValue[] { "one", "two", "three" });

            Console.WriteLine("Command: sadd nonexistingset one two three | Result: " + saddResult);

            /**
             * Check set members
             *
             * Command: smembers nonexistingset
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             */
            smembersResult = rdb.SetMembers("nonexistingset");

            Console.WriteLine("Command: smembers nonexistingset | Result: " + String.Join(",", smembersResult));

            /**
             * Set a string key
             * Command: set bigboxstr "some string value"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some string value");

            Console.WriteLine("Command: set bigboxstr \"some string value\" | Result: " + setResult);

            /**
             * Try to use SADD on the string key
             * We get an error
             *
             * Command: sadd bigboxstr "some element"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                bool saddResult2 = rdb.SetAdd("bigboxstr", "some element");

                Console.WriteLine("Command: sadd bigboxstr \"some element\" | Result: " + saddResult2);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: sadd bigboxstr \"some element\" | Error: " + e.Message);
            }

        }
    }
}