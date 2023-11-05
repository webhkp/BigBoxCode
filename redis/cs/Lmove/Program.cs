// Redis LMOVE command examples in C#

using StackExchange.Redis;

namespace Lmove
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
            * Command: rpush bigboxlist one two three four five six seven "last last item"
            * Result: (integer) 8
            */
            long pushResult = rdb.ListRightPush("bigboxlist", new RedisValue[] { "one", "two", "three", "four", "five", "six", "seven", "last last item" });

            Console.WriteLine("Command: rpush bigboxlist one two three four five six seven \"last last item\" | Result: " + pushResult);


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
             *      6) "six"
             *      7) "seven"
             *      8) "last last item"
             */
            RedisValue[] lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Check if "newlist" exists or not
             * It does not exist yet
             *
             * Command: exists newlist
             * Result: (integer) 0
             */
            bool checkExistance = rdb.KeyExists("newlist");

            Console.WriteLine("Command: exists newlist | Result: " + checkExistance);


            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the right(TAIL) newlist
             * The moved item is "one"
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "one"
             */
            RedisValue lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Check newlist
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the right(TAIL) newlist
             * The moved item is "two"
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "two"
             */
            lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Here is the status of newlist after second move
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the left(HEAD) newlist
             * The moved item is "three"
             *
             * Command: lmove bigboxlist newlist left left
             * Result: "three"
             */
            lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Left);

            Console.WriteLine("Command: lmove bigboxlist newlist left left | Result: " + lmoveResult);

            /**
             * Status of newlist after the LMOVE operation
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Perform LMOVE multiple times
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "four"
             */
            lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Command: lmove bigboxlist newlist left right
             * Result: "five"
             */
            lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Command: lmove bigboxlist newlist left right
             * Result: "six"
             */
            lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Command: lmove bigboxlist newlist left right
             * Result: "seven"
             */
            lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Check status of mylist
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             *      4) "four"
             *      5) "five"
             *      6) "six"
             *      7) "seven"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the right(TAIL) newlist
             * The moved item is "last last item", this is the last item of bigboxlist
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "last last item"
             */
            lmoveResult = rdb.ListMove("bigboxlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Check newlist
             * It has all the items now from bigboxlist
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             *      4) "four"
             *      5) "five"
             *      6) "six"
             *      7) "seven"
             *      8) "last last item"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Check items of bigboxlist
             * This is empty now all the items are popped out of it
             *
             * Command: lrange bigboxlist 0 -1
             * Result: (empty array)
             */
            lrangeResult = rdb.ListRange("bigboxlist", 0, -1);

            Console.WriteLine("Command: lrange bigboxlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Check if bigboxlist key exists anymore
             * It does not exist. As it was deleted when the last item was popped out of it.
             *
             * Command: exists bigboxlist
             * Result: (integer) 0
             */
            checkExistance = rdb.KeyExists("bigboxlist");

            Console.WriteLine("Command: exists bigboxlist | Result: " + checkExistance);

            /**
             * Set a string value
             *
             * Command: set firstkey "some value here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("firstkey", "some value here");
            Console.WriteLine("Command: set firstkey \"some value here\" | Result: " + setResult);

            /**
             * Try to use a string type key in the LMOVE 
             * It returns an error
             *
             * Command: lmove newlist firstkey left right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lmoveResult = rdb.ListMove("newlist", "firstkey", ListSide.Left, ListSide.Right);

                Console.WriteLine("Command: lmove newlist firstkey left right | Result: " + lmoveResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lmove newlist firstkey left right | Error: " + e.Message);
            }

            /**
             * Command: lmove firstkey newlist left right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                lmoveResult = rdb.ListMove("firstkey", "newlist", ListSide.Left, ListSide.Right);

                Console.WriteLine("Command: lmove firstkey newlist left right | Result: " + lmoveResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: lmove firstkey newlist left right | Error: " + e.Message);
            }

            /**
             * Use a non existing list/key as source
             * Nothing is added to the destination list, as there is nothing in the source
             * (nil) is retuned as a result
             *
             * Command: lmove nonexistingsource newlist left right
             * Result: (nil)
             */
            lmoveResult = rdb.ListMove("nonexistingsource", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove nonexistingsource newlist left right | Result: " + lmoveResult);

            /**
             * Check the nonexistingsource
             *
             * Command: lrange nonexistingsource 0 -1
             * Result: (empty array)
             */
            lrangeResult = rdb.ListRange("nonexistingsource", 0, -1);

            Console.WriteLine("Command: lrange nonexistingsource 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Check even if the key exist
             * It does not exist
             *
             * Command: exists nonexistingsource
             * Result: (integer) 0
             */
            checkExistance = rdb.KeyExists("nonexistingsource");

            Console.WriteLine("Command: exists nonexistingsource | Result: " + checkExistance);

            /**
             * Check if newlist was affected in any way by the previous LMOVE operation
             * It was not affected, as the sources did not exists
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             *      4) "four"
             *      5) "five"
             *      6) "six"
             *      7) "seven"
             *      8) "last last item"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Use the same list as source and destination
             *
             * Command: lmove newlist newlist left right
             * Result: "three"
             */
            lmoveResult = rdb.ListMove("newlist", "newlist", ListSide.Left, ListSide.Right);

            Console.WriteLine("Command: lmove newlist newlist left right | Result: " + lmoveResult);

            /**
             * Let's check the list
             * "three" was moved from left/head and added to right/tail
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "four"
             *      4) "five"
             *      5) "six"
             *      6) "seven"
             *      7) "last last item"
             *      8) "three"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }

            /**
             * Use the same list as source and desitnation
             * Pop and push at the same end
             *
             * Command: lmove newlist newlist left left
             * Result: "one"
             */
            lmoveResult = rdb.ListMove("newlist", "newlist", ListSide.Left, ListSide.Left);

            Console.WriteLine("Command: lmove newlist newlist left left | Result: " + lmoveResult);

            /**
             * Last operation results in the same list, as the item was popped and pushed at the same end
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "four"
             *      4) "five"
             *      5) "six"
             *      6) "seven"
             *      7) "last last item"
             *      8) "three"
             */
            lrangeResult = rdb.ListRange("newlist", 0, -1);

            Console.WriteLine("Command: lrange newlist 0 -1 | Result:");

            foreach (var item in lrangeResult)
            {
                Console.WriteLine(item);
            }
        }
    }
}