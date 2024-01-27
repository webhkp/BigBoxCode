// Redis GEOSEARCH command examples in C#

using StackExchange.Redis;
using System.Text.Json;

namespace GeoSearch
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
            RedisValue[] zrangeResult = rdb.SortedSetRangeByRank("bigboxcity", start: 0, stop: -1);

            Console.WriteLine("Command: zrange bigboxcity 0 -1 withscores | Result: " + String.Join(",", zrangeResult));

            /**
            * Check cities in a certeain size rectagle from Paris
            *
            * Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km
            * Result:
            *      1) "Rome"
            *      2) "Paris"
            *      3) "Bangkok"
            */
            GeoRadiusResult[] searchResult = rdb.GeoSearch("bigboxcity", "Paris", new GeoSearchBox(21_500, 20_000, GeoUnit.Kilometers), options: GeoRadiusOptions.None);

            Console.WriteLine("Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km | Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));

            /**
             * Check cities in 9700KM radius from Paris
             *
             * Command: geosearch bigboxcity frommember Paris byradius 9700 km
             * Result:
             *          1) "Rome"
             *          2) "Paris"
             *          3) "Bangkok"
             *          4) "Hong Kong"
             */
            searchResult = rdb.GeoSearch("bigboxcity", "Paris", new GeoSearchCircle(9700, GeoUnit.Kilometers), options: GeoRadiusOptions.None);

            Console.WriteLine("Command: geosearch bigboxcity frommember Paris byradius 9700 km | Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));

            /**
             * Search location and get additional information like coordinates, distance, width
             *
             * Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash
             * Result:
             *      1)  1) "Rome"
             *          2) "1105.5914"
             *          3) (integer) 3480343273965391
             *          4)  1) "12.49636620283126831"
             *              2) "41.90278213378983452"
             *
             *      2)  1) "Paris"
             *          2) "0.0000"
             *          3) (integer) 3663832779125283
             *          4)  1) "2.35221952199935913"
             *              2) "48.85661220395509474"
             *
             *      3)  1) "Bangkok"
             *          2) "9445.7597"
             *          3) (integer) 3962257436268857
             *          4)  1) "100.50176292657852173"
             *              2) "13.75633095031508191"
             *
             *      4)  1) "Hong Kong"
             *          2) "9618.5790"
             *          3) (integer) 4046429669534462
             *          4)  1) "114.10949438810348511"
             *              2) "22.39642736199028406"
             */
            searchResult = rdb.GeoSearch("bigboxcity", "Paris", new GeoSearchCircle(9700, GeoUnit.Kilometers), options: GeoRadiusOptions.Default);

            Console.WriteLine("Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash | Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));
            
            /**
             * Search location by distance from certain longitude and latitude
             *
             * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash
             * Result:
             *      1)  1) "Bangkok"
             *          2) "1728.5852"
             *          3) (integer) 3962257436268857
             *          4)  1) "100.50176292657852173"
             *              2) "13.75633095031508191"
             *
             *      2)  1) "Hong Kong"
             *          2) "0.1972"
             *          3) (integer) 4046429669534462
             *          4)  1) "114.10949438810348511"
             *              2) "22.39642736199028406"
             *
             *      3)  1) "Tokyo"
             *          2) "2880.1615"
             *          3) (integer) 4171231230197033
             *          4)  1) "139.69171196222305298"
             *              2) "35.68948605865241319"
             */
            searchResult = rdb.GeoSearch("bigboxcity", 114.109497, 22.3982, new GeoSearchCircle(9000, GeoUnit.Kilometers));

            Console.WriteLine("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash | Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));
            
            /**
             * Use COUNT option to limit the number of results
             *
             * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2
             * Result:
             *      1)  1) "Hong Kong"
             *          2) "0.1972"
             *          3) (integer) 4046429669534462
             *          4)  1) "114.10949438810348511"
             *              2) "22.39642736199028406"
             *
             *      2)  1) "Bangkok"
             *          2) "1728.5852"
             *          3) (integer) 3962257436268857
             *          4)  1) "100.50176292657852173"
             *              2) "13.75633095031508191"
             */
            searchResult = rdb.GeoSearch("bigboxcity", 114.109497, 22.3982, new GeoSearchCircle(9000, GeoUnit.Kilometers), count: 2);

            Console.WriteLine("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2| Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));

            /**
             * Use ASC options to order assinding by disance
             *
             * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982  byradius 9000 km withcoord withdist withhash count 2 ASC
             * Result:
             *      1)  1) "Hong Kong"
             *          2) "0.1972"
             *          3) (integer) 4046429669534462
             *          4)  1) "114.10949438810348511"
             *              2) "22.39642736199028406"
             *
             *      2)  1) "Bangkok"
             *          2) "1728.5852"
             *          3) (integer) 3962257436268857
             *          4)  1) "100.50176292657852173"
             *              2) "13.75633095031508191"
             */
            searchResult = rdb.GeoSearch("bigboxcity", 114.109497, 22.3982, new GeoSearchCircle(9000, GeoUnit.Kilometers), count: 2, order: Order.Ascending);

            Console.WriteLine("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 ASC| Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));

            /**
             * Use DESC options to order desinding by disance
             *
             * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982  byradius 9000 km withcoord withdist withhash count 2 DESC
             * Result:
             *      1)  1) "Tokyo"
             *          2) "2880.1615"
             *          3) (integer) 4171231230197033
             *          4)  1) "139.69171196222305298"
             *              2) "35.68948605865241319"
             *
             *      2)  1) "Bangkok"
             *          2) "1728.5852"
             *          3) (integer) 3962257436268857
             *          4)  1) "100.50176292657852173"
             *              2) "13.75633095031508191"
             */
            searchResult = rdb.GeoSearch("bigboxcity", 114.109497, 22.3982, new GeoSearchCircle(9000, GeoUnit.Kilometers), count: 2, order: Order.Descending);

            Console.WriteLine("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 DESC| Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));

            /**
             * Use non existing key
             * We get empty array
             *
             * Command: geosearch wrongkey frommember Paris bybox 21500 20000 km
             * Result: (empty array)
             */
            searchResult = rdb.GeoSearch("wrongkey", "Paris", new GeoSearchBox(21500, 20000, GeoUnit.Kilometers));

            Console.WriteLine("Command: geosearch wrongkey frommember Paris bybox 21500 20000 km | Result: " + JsonSerializer.Serialize(searchResult));

            /**
             * Use non existing member name
             * We get an error
             *
             * Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km
             * Result: (error) ERR could not decode requested zset member
             */
            try
            {
                searchResult = rdb.GeoSearch("bigboxcity", "wrongmember", new GeoSearchBox(21500, 20000, GeoUnit.Kilometers));

                Console.WriteLine("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Error: " + e.Message);
            }

            /**
            * Use wrong key and wrong member name
            * We get empty array
            *
            * Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km
            * Result: (empty array)
            */
            searchResult = rdb.GeoSearch("wrongkey", "wrongmember", new GeoSearchBox(21500, 20000, GeoUnit.Kilometers));

            Console.WriteLine("Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km | Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));

            /**
             * Set a string
             *
             * Command: set bigboxstr "some str here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some str here");

            Console.WriteLine("Command: set bigboxstr \"some str here\" | Result: " + setResult);

            /**
             * Try to use a key that is not a geoindexc#
             * We get an error
             *
             * Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                searchResult = rdb.GeoSearch("bigboxstr", 114.109497, 22.3982, new GeoSearchCircle(9000, GeoUnit.Kilometers));

                Console.WriteLine("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Result: " + JsonSerializer.Serialize(searchResult, new JsonSerializerOptions { WriteIndented = true }));
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Error: " + e.Message);
            }
        }
    }

 
}