// Redis GEOHASH command examples in C#

using StackExchange.Redis;

namespace GeoHash
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
             * Check geohash of a single member
             *
             * Command: geohash bigboxcity Paris
             * Result:
             *      1) "u09tvw0f6s0"
             */
            string? geohashResult = rdb.GeoHash("bigboxcity", "Paris");

            Console.WriteLine("Command: geohash bigboxcity Paris | Result: " + geohashResult);

            /**
             * Check geohash of multiple members
             *
             * Command: geohash bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
             * Result:
             *      1) "sr2ykk5t6k0"
             *      2) "wecpkt5uxu0"
             *      3) "xn774c06kf0"
             *      4) "u09tvw0f6s0"
             *      5) "w4rqqbr0kv0"
             */
            string?[] geohashResults = rdb.GeoHash("bigboxcity", new RedisValue[] { "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok" });

            Console.WriteLine("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: " + String.Join(",", geohashResults));

            /**
             * Check geohash of multiple members
             * But pass one non existing member name
             * We get (nil) for the non existing member
             *
             * Command: geohash bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
             * Result:
             *      1) "sr2ykk5t6k0"
             *      2) "wecpkt5uxu0"
             *      3) "xn774c06kf0"
             *      4) (nil)
             *      5) "w4rqqbr0kv0"
             */
            geohashResults = rdb.GeoHash("bigboxcity", new RedisValue[] { "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok" });

            Console.WriteLine("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: " + String.Join(",", geohashResults));

            /**
             * Check geohash of a non existing members
             * (nil) is returned for the non existing members
             *
             * Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3
             * Result:
             *      1) (nil)
             *      2) (nil)
             *      3) (nil)
             */
            geohashResults = rdb.GeoHash("bigboxcity", new RedisValue[] { "wrongmember1", "wrongmember2", "wrongmember3" });

            Console.WriteLine("Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: " + String.Join(",", geohashResults));

            /**
             * Pass wrong key and wrong members
             * Returns (nil) for all those members
             *
             * Command: geohash wrongkey membera memberb memberc
             * Result:
             *      1) (nil)
             *      2) (nil)
             *      3) (nil)
             */
            geohashResults = rdb.GeoHash("wrongkey", new RedisValue[] { "membera", "memberb", "memberc" });

            Console.WriteLine("Command: geohash wrongkey membera memberb memberc | Result: " + String.Join(",", geohashResults));

            /**
             * Set string value
             *
             * Command: set bigboxstr "some string here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "soem string here");

            Console.WriteLine("Command: set bigboxstr \"some string here\" | Result: " + setResult);

            /**
             * Try to use GEOHASH with some key that is not a geindex
             * We get an error, for using key of wrong type
             *
             * Command: geohash bigboxstr abc
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                geohashResult = rdb.GeoHash("bigboxstr", "abc");

                Console.WriteLine("Command: geohash bigboxstr abc | Result: " + geohashResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: geohash bigboxstr abc | Error: " + e.Message);
            }
        }
    }
}