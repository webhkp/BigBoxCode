// Redis SET command examples in C#

using StackExchange.Redis;

namespace Set
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();


            /**
             * Set value for a key
             *
             * Command: set firstkey "abcdef"
             * Result: OK
             */
            var setCommandResult = rdb.StringSet("firstkey", "abcdef");

            Console.WriteLine("Command: set firstkey \"abcdef\" | Result: " + setCommandResult);


            /**
             * Command: get firstkey
             * Result: "abcdef"
             */
            var getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);


            /**
             * Set value for the same key again. The new value is set for the key
             *
             * Command: set firstkey defghi
             * Result: OK
             */
            setCommandResult = rdb.StringSet("firstkey", "defghi");

            Console.WriteLine("Command: set firstkey defghi | Result: " + setCommandResult);


            /**
             * Command: get firstkey
             * Result: "defghi"
             */
            getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);


            /**
             * Use "XX" option to set value only if the key already exists
             *
             * Command: set secondkey "000000000000" XX
             * Result: (nil)
             */
            setCommandResult = rdb.StringSet("secondkey", "000000000000", when: When.Exists);

            Console.WriteLine("Command: set secondkey \"000000000000\" XX | Result: " + setCommandResult);


            /**
             * secondkey is not set in this case as it was not preexisting
             *
             * Command: get secondkey
             * Result: (nil)
             */
            getCommandResult = rdb.StringGet("secondkey");

            Console.WriteLine("Command: get secondkey | Result: " + getCommandResult);


            /**
             * Use "NX" option to set value if the key does not exist
             *
             * Command: set secondkey "000000000000" NX
             * Result: OK
             */
            setCommandResult = rdb.StringSet("secondkey", "000000000000", when: When.NotExists);

            Console.WriteLine("Command: set secondkey \"000000000000\" NX | Result: " + setCommandResult);


            /**
             * secondkey is set as it was not pre-existing
             *
             * Command: get secondkey
             * Result: "000000000000"
             */
            getCommandResult = rdb.StringGet("secondkey");

            Console.WriteLine("Command: get secondkey | Result: " + getCommandResult);


            /**
             * Use "NX" for an existing key, that returns nil
             *
             * Command: set firstkey "work idea" NX
             * Result: (nil)
             */
            setCommandResult = rdb.StringSet("firstkey", "work idea", when: When.NotExists);

            Console.WriteLine("Command: set firstkey \"work idea\" NX | Result: " + setCommandResult);


            /**
             * Command: get firstkey
             * Result: "defghi"
             */
            getCommandResult = rdb.StringGet("firstkey");

            Console.WriteLine("Command: get firstkey | Result: " + getCommandResult);


            /**
             * Pass the "GET" option to get the previous value.
             * If the value was not set previously then we get nil
             *
             * Command: set thirdkey 1111111111 GET
             * Result: (nil)
             */
            getCommandResult = rdb.StringSetAndGet("thirdkey", "1111111111");

            Console.WriteLine("Command: set thirdkey 1111111111 GET | Result: " + getCommandResult);


            /**
             * Pass "GET" to fetch the previous value before setting new value
             *
             * Command: set thirdkey 99999999 GET
             * Result: "1111111111"
             */
            getCommandResult = rdb.StringSetAndGet("thirdkey", "99999999");

            Console.WriteLine("Command: set thirdkey 99999999 GET | Result: " + getCommandResult);


            /**
             * Set expire time in seconds using "EX" option (other expire duration related options work the same way)
             *
             * Command: set fourthkey "some value for expire" EX 120
             * Result: OK
             */
            setCommandResult = rdb.StringSet("fourthkey", "some value for expire", new TimeSpan(0, 0, 120));

            Console.WriteLine("Command: set fourthkey \"some value for expire\" EX 120 | Result: " + setCommandResult);


            /**
             * Command: ttl fourthkey
             * Result: (integer) 120
             */
            var ttl = rdb.KeyTimeToLive("fourthkey");

            Console.WriteLine("Command: ttl fourthkey | Result: " + ttl);


            /**
             * Set expire time
             *
             * Command: set mykey "some val" ex 360
             * Result: OK
             */
            setCommandResult = rdb.StringSet("mykey", "some val", new TimeSpan(0, 0, 360));

            Console.WriteLine("Command: set mykey \"some val\" ex 360 | Result: " + setCommandResult);


            /**
             * Command: ttl mykey
             * Result: (integer) 360
             */
            ttl = rdb.KeyTimeToLive("mykey");

            Console.WriteLine("Command: ttl mykey | Result: " + ttl);


            /**
             * Setting already existing key will remove the TTL if there is any
             *
             * Command: set mykey "changed value"
             * Result: OK
             */
            setCommandResult = rdb.StringSet("mykey", "changed value");

            Console.WriteLine("Command: set mykey \"changed value\" | Result: " + setCommandResult);


            /**
             * TTL was removed as the value was set the second time without any expire time
             *
             * Command: ttl mykey
             * Result: (integer) -1
             */
            ttl = rdb.KeyTimeToLive("mykey");

            Console.WriteLine("Command: ttl mykey | Result: " + ttl);


            /**
             * Set value with expire time - the following commands are for checking "KEEPTTL" option
             *
             * Command: set user:10 "John Doe" ex 360
             * Result: OK
             */
            setCommandResult = rdb.StringSet("user:10", "John Doe", new TimeSpan(0, 0, 360));

            Console.WriteLine("Command: set user:10 \"John Doe\" ex 360 | Result: " + setCommandResult);


            /**
             * Command: ttl user:10
             * Result: (integer) 360
             */
            ttl = rdb.KeyTimeToLive("user:10");

            Console.WriteLine("Command: ttl user:10 | Result: " + ttl);


            /**
             * Set value for the same key, and pass "KEEPTTL" option. This will keep the TTL that was associated with the key
             *
             * Command: set user:10 "Some user" keepttl
             * Result: OK
             */
            setCommandResult = rdb.StringSet("user:10", "Some user", keepTtl: true);

            Console.WriteLine("Command: set user:10 \"Some user\" keepttl | Result: " + setCommandResult);


            /**
             * Lets check the TTL. The TTL still exists because of usign the "KEEPTTL" option
             *
             * Command: ttl user:10
             * Result: (integer) 360
             */
            ttl = rdb.KeyTimeToLive("user:10");

            Console.WriteLine("Command: ttl user:10 | Result: " + ttl);
        }
    }
}