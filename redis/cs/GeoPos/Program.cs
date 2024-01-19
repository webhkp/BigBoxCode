// Redis GEOPOS command examples in C#

using StackExchange.Redis;

namespace GeoPos
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Add city longitude and latitude to geoindex named bigboxcity
             * Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
             * Result: (integer) 5
             */
            GeoEntry[] locationData = new GeoEntry[]{
                new GeoEntry(2.352222, 48.856613, "Paris"),
                new GeoEntry(100.501762, 13.756331, "Bangkok"),
                new GeoEntry(114.109497, 22.396427, "Hong Kong"),
                new GeoEntry(139.691711, 35.689487, "Tokyo"),
                new GeoEntry(12.496365, 41.90278, "Rome"),
            };
            long getaddResults = rdb.GeoAdd("bigboxcity", locationData);

            Console.WriteLine("Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: " + getaddResults);

            /**
             * Check the items in bigboxcity
             * Command: zrange bigboxcity 0 -1
             * Result:
             *      1) "Rome"
             *      2) "Paris"
             *      3) "Bangkok"
             *      4) "Hong Kong"
             *      5) "Tokyo"
             */
            RedisValue[] zrangeResult = rdb.SortedSetRangeByScore("bigboxcity", 0, -1);

            Console.WriteLine("Command: zrange bigboxcity 0 -1 withscores | Result: " + String.Join(",", zrangeResult));

            /**
             * Check geopos of a single member
             *
             * Command: geopos bigboxcity Paris
             * Result:
             *      1)  1) "2.35221952199935913"
             *          2) "48.85661220395509474"
             */
            GeoPosition? geoposResult = rdb.GeoPosition("bigboxcity", "Paris");

            Console.WriteLine("Command: geopos bigboxcity Paris | Result: " + geoposResult.ToString());

            /**
             * Check geopos of multiple members
             *
             * Command: geopos bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
             * Result:
             *      1)  1) "12.49636620283126831"
             *          2) "41.90278213378983452"
             *      2)  1) "114.10949438810348511"
             *          2) "22.39642736199028406"
             *      3)  1) "139.69171196222305298"
             *          2) "35.68948605865241319"
             *      4)  1) "2.35221952199935913"
             *          2) "48.85661220395509474"
             *      5)  1) "100.50176292657852173"
             *          2) "13.75633095031508191"
             */
            GeoPosition?[] geoposResults = rdb.GeoPosition("bigboxcity", new RedisValue[] { "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok" });

            Console.WriteLine("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: " + String.Join(", ", geoposResults));

            /**
             * Check geopos of multiple members
             * But pass one non existing member name
             * We get (nil) for the non existing member
             *
             * Command: geopos bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
             * Result:
             *      1)  1) "12.49636620283126831"
             *          2) "41.90278213378983452"
             *      2)  1) "114.10949438810348511"
             *          2) "22.39642736199028406"
             *      3)  1) "139.69171196222305298"
             *          2) "35.68948605865241319"
             *      4) (nil)
             *      5)  1) "100.50176292657852173"
             *          2) "13.75633095031508191"
             */
            geoposResults = rdb.GeoPosition("bigboxcity", new RedisValue[] { "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok" });

            Console.WriteLine("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: " + String.Join(", ", geoposResults));

            /**
             * Using the same member multiple times will return the position multiple times
             *
             * Command: geopos bigboxcity Tokyo Tokyo Tokyo
             * Result:
             *      1)  1) "139.69171196222305298"
             *          2) "35.68948605865241319"
             *      2)  1) "139.69171196222305298"
             *          2) "35.68948605865241319"
             *      3)  1) "139.69171196222305298"
             *          2) "35.68948605865241319"
             */
            geoposResults = rdb.GeoPosition("bigboxcity", new RedisValue[] { "Tokyo", "Tokyo", "Tokyo" });

            Console.WriteLine("Command: geopos bigboxcity geopos bigboxcity Tokyo Tokyo Tokyo | Result: " + String.Join(", ", geoposResults));

            /**
             * Check geopos of a non existing members
             * (nil) is returned for the non existing members
             *
             * Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3
             * Result:
             *      1) (nil)
             *      2) (nil)
             *      3) (nil)
             */
            geoposResults = rdb.GeoPosition("bigboxcity", new RedisValue[] { "wrongmember1", "wrongmember2", "wrongmember3" });

            Console.WriteLine("Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: " + String.Join(", ", geoposResults));

            /**
             * Check the command without any member
             * We get an empty array
             *
             * Command: geopos bigboxcity
             * Result: (empty array)
             */
            geoposResults = rdb.GeoPosition("bigboxcity", new RedisValue[] { });

            Console.WriteLine("Command: geopos bigboxcity | Result: " + String.Join(", ", geoposResults));

            /**
             * Pass a wrong non existing key
             * we get an empty array
             *
             * Command: geopos wrongkey
             * Result: (empty array)
             */
            geoposResults = rdb.GeoPosition("wrongkey", new RedisValue[] { });

            Console.WriteLine("Command: geopos wrongkey | Result: " + String.Join(", ", geoposResults));

            /**
             * Pass wrong key and wrong members
             * Returns (nil) for all those members
             *
             * Command: geopos wrongkey membera memberb memberc
             * Result:
             *      1) (nil)
             *      2) (nil)
             *      3) (nil)
             */
            geoposResults = rdb.GeoPosition("wrongkey", new RedisValue[] { "membera", "memberb", "memberc" });

            Console.WriteLine("Command: geopos wrongkey membera memberb memberc | Result: " + String.Join(", ", geoposResults));

            /**
             * Set string value
             *
             * Command: set bigboxstr "some string here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "soem string here");

            Console.WriteLine("Command: set bigboxstr \"some string here\" | Result: " + setResult);

            /**
             * Try to use GEOPOS with some key that is not a geindex
             * We get an error, for using key of wrong type
             *
             * Command: geopos bigboxstr abc
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                geoposResult = rdb.GeoPosition("bigboxstr", "abc");

                Console.WriteLine("Command: geopos bigboxstr abc | Result: " + geoposResult.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: geopos bigboxstr abc | Error: " + e.Message);
            }
        }
    }
}