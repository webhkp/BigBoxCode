// Redis LPOS command examples in C#

using StackExchange.Redis;

namespace Lpos
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Push items to list
             *
             * Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine
             * Result: (integer) 15
             */
            long listPushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "one", "two", "three", "four", "five", "one", "testA", "two", "testB", "testC", "one", "two", "nine", "one", "nine" });

            Console.WriteLine("Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine | Result:" + listPushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "four"
             *      5) "five"
             *      6) "one"
             *      7) "testA"
             *      8) "two"
             *      9) "testB"
             *      10) "testC"
             *      11) "one"
             *      12) "two"
             *      13) "nine"
             *      14) "one"
             *      15) "nine"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);
            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:" + string.Join(", ", lrangeResult));

            /**
             * Check first index of "one"
             *
             * Command: lpos bigboxlist one
             * Result: (integer) 0
             */
            long lposResult = rdb.ListPosition("bigboxlist", "one");
            Console.WriteLine("Command: lpos bigboxlist one | Result: " + lposResult);

            /**
             * Check first index of "two"
             *
             * Command: lpos bigboxlist two
             * Result: (integer) 1
             */
            lposResult = rdb.ListPosition("bigboxlist", "two");

            Console.WriteLine("Command: lpos bigboxlist two | Result: " + lposResult);

            /**
             * Check first index of "five"
             *
             * Command: lpos bigboxlist five
             * Result: (integer) 4
             */
            lposResult = rdb.ListPosition("bigboxlist", "five");

            Console.WriteLine("Command: lpos bigboxlist five | Result: " + lposResult);

            /**
             * Check second occurrence of "one"
             *
             * Command: lpos bigboxlist one rank 2
             * Result: (integer) 5
             */
            lposResult = rdb.ListPosition("bigboxlist", "one", rank: 2);

            Console.WriteLine("Command: lpos bigboxlist one rank 2 | Result: " + lposResult);

            /**
             * Check 5th occurrence of "one"
             * We get (nil) as this item occurs less than 5 times
             *
             * Command: lpos bigboxlist one rank 5
             * Result: (nil)
             */
            lposResult = rdb.ListPosition("bigboxlist", "one", rank: 5);

            Console.WriteLine("Command: lpos bigboxlist one rank 5 | Result: " + lposResult);

            /**
             * Get first 2 occurrance of "one"
             *
             * Command: lpos bigboxlist one count 2
             * Result:
             *      1) (integer) 0
             *      2) (integer) 5
             */
             long[] lposResults = rdb.ListPositions("bigboxlist", "one", 2);

            Console.WriteLine("Command: lpos bigboxlist one count 2 | Result: " + string.Join(", ", lposResults));

            /**
             * Try to get first 8 occurrences of "one"
             * We get only 4 indexes, as "one" is there only 4 times in the list
             *
             * Command: lpos bigboxlist one count 8
             * Result:
             *      1) (integer) 0
             *      2) (integer) 5
             *      3) (integer) 10
             *      4) (integer) 13
             */
            lposResults = rdb.ListPositions("bigboxlist", "one", 8);

            Console.WriteLine("Command: lpos bigboxlist one count 8 | Result: " + string.Join(", ", lposResults));

            /**
             * Pass count as 0 to return all occurrences
             *
             * Command: lpos bigboxlist one count 0
             * Result:
             *      1) (integer) 0
             *      2) (integer) 5
             *      3) (integer) 10
             *      4) (integer) 13
             */
            lposResults = rdb.ListPositions("bigboxlist", "one", 0);

            Console.WriteLine("Command: lpos bigboxlist one count 0 | Result: " + string.Join(", ", lposResults));

            /**
             * Get 2 occurrences of "one" starting from the 2nd occurrance
             *
             * Command: lpos bigboxlist one rank 2 count 2
             * Result:
             *      1) (integer) 5
             *      2) (integer) 10
             */
            lposResults = rdb.ListPositions("bigboxlist", "one", 2, rank: 2);

            Console.WriteLine("Command: lpos bigboxlist one rank 2 count 2 | Result: " + string.Join(", ", lposResults));

            /**
             * Get all occurrences of "one" starting from the 2nd occurrance
             *
             * Command: lpos bigboxlist one rank 2 count 0
             * Result:
             *      1) (integer) 5
             *      2) (integer) 10
             *      3) (integer) 13
             */
            lposResults = rdb.ListPositions("bigboxlist", "one", 0, rank: 2);

            Console.WriteLine("Command: lpos bigboxlist one rank 2 count 0 | Result: " + string.Join(", ", lposResults));

            /**
             * Get one occurence from the end of the list
             *
             * Command: lpos bigboxlist one rank -1
             * Result: (integer) 13
             */
            lposResult = rdb.ListPosition("bigboxlist", "one", rank: -1);

            Console.WriteLine("Command: lpos bigboxlist one rank -1 | Result: " + lposResult);

            /**
             * Get 3 occurences of "one" from the end
             *
             * Command: lpos bigboxlist one rank -1 count 3
             * Result:
             *      1) (integer) 13
             *      2) (integer) 10
             *      3) (integer) 5
             */
            lposResults = rdb.ListPositions("bigboxlist", "one", 3, rank: -1);

            Console.WriteLine("Command: lpos bigboxlist one rank -1 count 3 | Result: " + string.Join(", ", lposResults));

            /**
             * Try to get index of "two" withing first 1 item
             * (nil) is returned as "two" is not there is first 1 item
             *
             * Command: lpos bigboxlist two maxlen 1
             * Result: (nil)
             */
            lposResult = rdb.ListPosition("bigboxlist", "two", maxLength: 1);

            Console.WriteLine("Command: lpos bigboxlist two maxlen 1 | Result: " + lposResult);

            /**
             * Get index of "two" withing first 10 list items
             * We get the index 1, as this is the first occurence
             *
             * Command: lpos bigboxlist two maxlen 10
             * Result: (integer) 1
             */
            lposResult = rdb.ListPosition("bigboxlist", "two", maxLength: 10);

            Console.WriteLine("Command: lpos bigboxlist two maxlen 10 | Result: " + lposResult);

            /**
             * Get 2 occurrences of "two" withing first 10 items
             *
             * Command: lpos bigboxlist two count 2 maxlen 10
             * Result:
             *      1) (integer) 1
             *      2) (integer) 7
             */
            lposResults = rdb.ListPositions("bigboxlist", "two", 2, maxLength: 10);

            Console.WriteLine("Command: lpos bigboxlist two count 2 maxlen 10 | Result: " + string.Join(", ", lposResults));

            /**
             * Get all occurrences of "two" withing first 10 items
             *
             * Command: lpos bigboxlist two count 0 maxlen 10
             * Result:
             *      1) (integer) 1
             *      2) (integer) 7
             */
            lposResults = rdb.ListPositions("bigboxlist", "two", 0, maxLength: 10);

            Console.WriteLine("Command: lpos bigboxlist two count 0 maxlen 10 | Result: " + string.Join(", ", lposResults));

            /**
             * Get all occurrences of "two" withing first 15 items
             *
             * Command: lpos bigboxlist two count 0 maxlen 15
             * Result:
             *      1) (integer) 1
             *      2) (integer) 7
             *      3) (integer) 11
             */
            lposResults = rdb.ListPositions("bigboxlist", "two", 0, maxLength: 15);

            Console.WriteLine("Command: lpos bigboxlist two count 0 maxlen 15 | Result: " + string.Join(", ", lposResults));

            /**
             * Get results from the end and consider 10 items from the end
             *
             * Command: lpos bigboxlist two maxlen 10 rank -1
             * Result: (integer) 11
             */
            lposResult = rdb.ListPosition("bigboxlist", "two", maxLength: 10, rank: -1);

            Console.WriteLine("Command: lpos bigboxlist two maxlen 10 rank -1 | Result: " + lposResult);

            /**
             * Get 2nd occurence from the end and consider 10 items from the end
             *
             * Command: lpos bigboxlist two maxlen 10 rank -2
             * Result: (integer) 7
             */
            lposResult = rdb.ListPosition("bigboxlist", "two", maxLength: 10, rank: -2);

            Console.WriteLine("Command: lpos bigboxlist two maxlen 10 rank -2 | Result: " + lposResult);

            /**
             * Get 1st occurence of "three" from the end and consider 10 items from the end
             * Three does not exist in last 10 items, so we get (nil)
             *
             * Command: lpos bigboxlist three maxlen 10 rank -1
             * Result: (nil)
             */
            lposResult = rdb.ListPosition("bigboxlist", "three", maxLength: 10, rank: -1);

            Console.WriteLine("Command: lpos bigboxlist three maxlen 10 rank -1 | Result: " + lposResult);

            /**
             * Try to get a non existing element from a list
             * We get (nil) value
             *
             * Command: lpos bigboxlist nonexistingitem
             * Result: (nil)
             */
            lposResult = rdb.ListPosition("bigboxlist", "nonexistingitem");

            Console.WriteLine("Command: lpos bigboxlist nonexistingitem | Result: " + lposResult);

            /**
             * Set a string value
             *
             * Command: set mystr "my string value here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("mystr", "my string value here");

            Console.WriteLine("Command: set mystr \"my string value here\" | Result: " + setResult);

            /**
             * Try to use LPOS command on a string
             * We get an error for the wrong type of operation
             *
             * Command: lpos mystr m
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lposResult = rdb.ListPosition("mystr", "m");

                Console.WriteLine("Command: lpos mystr m | Result: " + lposResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lpos mystr m | Error: " + e.Message);
            }

            /**
             * Error returned if COUNT is negative
             *
             * Command: lpos bigboxlist one count -3
             * Result: (error) ERR COUNT can't be negative
             */
            try
            {
                lposResults = rdb.ListPositions("bigboxlist", "one", -3);

                Console.WriteLine("Command: lpos bigboxlist one count -3 | Result: " + string.Join(", ", lposResults));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lpos bigboxlist one count -3 | Error: " + e.Message);
            }

            /**
             * Error returned if MAXLEN is negative
             *
             * Command: lpos bigboxlist one maxlen -3
             * Result: (error) ERR MAXLEN can't be negative
             */
            try
            {
                lposResult = rdb.ListPosition("bigboxlist", "one", maxLength: -3);

                Console.WriteLine("Command: lpos bigboxlist one maxlen -3 | Result: " + lposResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lpos bigboxlist one maxlen -3 | Error: " + e.Message);
            }

        }
    }
}