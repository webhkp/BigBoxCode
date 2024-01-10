// Redis GEODIST command examples in C#

using StackExchange.Redis;

namespace GeoDist
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
             * Check distance of Paris and Tokyo
             * This distance is in meter unit, as meter is the default
             *
             * Command: geodist bigboxcity Paris Tokyo
             * Result: "9714811.3348"
             */
            double? geodistResult = rdb.GeoDistance("bigboxcity", "Paris", "Tokyo");

            Console.WriteLine("Command: geodist bigboxcity Paris Tokyo | Result: " + geodistResult);

            /**
             * Check distance of Paris and Hong Kong
             * This distance is in kilometer as we provide km to the command
             *
             * Command: geodist bigboxcity Paris "Hong Kong" km
             * Result: "9618.5790"
             */
            geodistResult = rdb.GeoDistance("bigboxcity", "Paris", "Hong Kong", GeoUnit.Kilometers);

            Console.WriteLine("Command: geodist bigboxcity Paris \"Hong Kong\" km | Result: " + geodistResult);

            /**
             * Distance to the same city will be zero
             *
             * Command: geodist bigboxcity Paris Paris
             * Result: "0.0000"
             */
            geodistResult = rdb.GeoDistance("bigboxcity", "Paris", "Paris");

            Console.WriteLine("Command: geodist bigboxcity Paris Paris | Result: " + geodistResult);

            /**
             * We get (nil) if one or both of the cities do not exist in our geoindex
             *
             * Command: geodist bigboxcity Paris "unknown city"
             * Result: (nil)
             */
            geodistResult = rdb.GeoDistance("bigboxcity", "Paris", "unknown city");

            Console.WriteLine("Command: geodist bigboxcity Paris \"unknown city\" | Result: " + geodistResult);

            /**
             * Set a string
             *
             * Command: set bigboxstr "test string here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "test string here");

            Console.WriteLine("Command: set bigboxstr \"test string here\" | Result: " + setResult);

            /**
             * Try to add GEODIST on a string
             * We get a type error
             *
             * Command: geodist bigboxstr Paris Tokyo
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                geodistResult = rdb.GeoDistance("bigboxstr", "Paris", "Tokyo");

                Console.WriteLine("Command: geodist bigboxstr Paris Tokyo | Result: " + geodistResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: geodist bigboxstr Paris Tokyo | Result: " + e.Message);
            }
        }
    }
}