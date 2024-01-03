// Redis GEOADD command examples in C#

using StackExchange.Redis;

namespace GeoAdd
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Add single location
             * Command: geoadd bigboxcity 2.352222 48.856613 Paris
             * Result: (integer) 1
             */
            bool getaddResult = rdb.GeoAdd("bigboxcity", 2.352222, 48.85661, "Paris");

            Console.WriteLine("Command: geoadd bigboxcity 2.352222 48.856613 Paris | Result: " + getaddResult);

            /**
             * Add multiple location data
             * Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
             * Result: (integer) 4
             */
            GeoEntry[] locationData = new GeoEntry[]{
                new GeoEntry(100.501762, 13.756331, "Bangkok"),
            new GeoEntry(114.109497, 22.396427, "Hong Kong"),
            new GeoEntry(139.691711, 35.689487, "Tokyo"),
            new GeoEntry(12.496365, 41.90278, "Rome"),
                    };
            long getaddResults = rdb.GeoAdd("bigboxcity", locationData);

            Console.WriteLine("Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: " + getaddResults);

            /**
             * Check geospatial data using sorted set command
             * Command: zrange bigboxcity 0 -1 withscores
             * Result:
             *      1) "Rome"
             *      2) "3480343273965391"
             *      3) "Paris"
             *      4) "3663832779125283"
             *      5) "Bangkok"
             *      6) "3962257436268857"
             *      7) "Hong Kong"
             *      8) "4046429669534462"
             *      9) "Tokyo"
             *      10) "4171231230197033"
             */
            SortedSetEntry[] zrangeResult = rdb.SortedSetRangeByRankWithScores("bigboxcity", 0, -1);

            Console.WriteLine("Command: zrange bigboxcity 0 -1 withscores | Result: " + String.Join(",", zrangeResult));

            /**
             * Try to use value that is out of range
             * We get an error, which indicates vlaue is out of range
             * Command: geoadd bigboxcity 200 80 "Out of range"
             * Result: (error) ERR invalid longitude,latitude pair 200.000000,80.000000
             */
            try
            {
                getaddResult = rdb.GeoAdd("bigboxcity", 200, 80, "Out of range");

                Console.WriteLine("Command: geoadd bigboxcity 200 80 \"Out of range\" | Result: " + getaddResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: geoadd bigboxcity 200 80 \"Out of range\" | Result: " + e.Message);
            }

            /**
             * Set a string value
             * Command: set bigboxstr "my string for testing"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "my string for testing");

            Console.WriteLine("Command: set bigboxstr \"my string for testing\" | Result: " + setResult);

            /**
             * Try to use the string key for GETADD command
             * We get an error, which indicates the type of key is wrong
             * Command: geoadd bigboxstr 37.617298 55.755825 Moscow
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                getaddResult = rdb.GeoAdd("bigboxstr", 37.617298, 55.755825, "Moscow");

                Console.WriteLine("Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: " + getaddResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: " + e.Message);
            }
        }
    }
}