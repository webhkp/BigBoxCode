// Redis GEOSEARCH command example in Java

import redis.clients.jedis.GeoCoordinate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.args.GeoUnit;
import redis.clients.jedis.args.SortingOrder;
import redis.clients.jedis.params.GeoSearchParam;
import redis.clients.jedis.resps.GeoRadiusResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class GeoSearch {

    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Add members to a geo index named bigboxcity
             *
             * Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
             * Result: (integer) 5
             */
            Map<String, GeoCoordinate> locationData = new HashMap<>() {{
                put("Paris", new GeoCoordinate(2.352222, 48.856613));
                put("Bangkok", new GeoCoordinate(100.501762, 13.756331));
                put("Hong Kong", new GeoCoordinate(114.109497, 22.396427));
                put("Tokyo", new GeoCoordinate(139.691711, 35.689487));
                put("Rome", new GeoCoordinate(12.496365, 41.90278));
            }};
            long getaddResult = jedis.geoadd("bigboxcity", locationData);

            System.out.println("Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: " + getaddResult);

            /**
             * Check members saved in bigboxcity
             *
             * Command: zrange bigboxcity 0 -1
             * Result:
             *      1) "Rome"
             *      2) "Paris"
             *      3) "Bangkok"
             *      4) "Hong Kong"
             *      5) "Tokyo"
             */
            List<String> zrangeResult = jedis.zrange("bigboxcity", 0, -1);

            System.out.println("Command: zrange bigboxcity 0 -1 | Result: " + zrangeResult.toString());

            /**
             * Check cities in a certeain size rectagle from Paris
             *
             * Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km
             * Result:
             *      1) "Rome"
             *      2) "Paris"
             *      3) "Bangkok"
             */
            List<GeoRadiusResponse> searchResult = jedis.geosearch("bigboxcity", "Paris", 21_500, 20_000, GeoUnit.KM);

            System.out.println("Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km | Result: ");
            printSearchResult(searchResult, false, false);

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
            searchResult = jedis.geosearch("bigboxcity", "Paris", 9700, GeoUnit.KM);

            System.out.println("Command: geosearch bigboxcity frommember Paris byradius 9700 km | Result: ");
            printSearchResult(searchResult, false, false);

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
            searchResult = jedis.geosearch("bigboxcity", GeoSearchParam.geoSearchParam().fromMember("Paris").byRadius(9700, GeoUnit.KM).withCoord().withDist().withHash());

            System.out.println("Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash | Result: ");
            printSearchResult(searchResult, true, true);

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
            searchResult = jedis.geosearch("bigboxcity", GeoSearchParam.geoSearchParam().fromLonLat(114.109497, 22.3982).byRadius(9000, GeoUnit.KM).withCoord().withDist().withHash());

            System.out.println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash | Result: ");
            printSearchResult(searchResult, true, true);

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
            searchResult = jedis.geosearch("bigboxcity", GeoSearchParam.geoSearchParam().fromLonLat(114.109497, 22.3982).byRadius(9000, GeoUnit.KM).withCoord().withDist().withHash().count(2));

            System.out.println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2| Result: ");
            printSearchResult(searchResult, true, true);

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
            searchResult = jedis.geosearch("bigboxcity", GeoSearchParam.geoSearchParam().fromLonLat(114.109497, 22.3982).byRadius(9000, GeoUnit.KM).withCoord().withDist().withHash().count(2).sortingOrder(SortingOrder.ASC));

            System.out.println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 ASC| Result: ");
            printSearchResult(searchResult, true, true);

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
            searchResult = jedis.geosearch("bigboxcity", GeoSearchParam.geoSearchParam().fromLonLat(114.109497, 22.3982).byRadius(9000, GeoUnit.KM).withCoord().withDist().withHash().count(2).sortingOrder(SortingOrder.DESC));

            System.out.println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 DESC| Result: ");
            printSearchResult(searchResult, true, true);

            /**
             * Use non existing key
             * We get empty array
             *
             * Command: geosearch wrongkey frommember Paris bybox 21500 20000 km
             * Result: (empty array)
             */
            searchResult = jedis.geosearch("wrongkey", "Paris", 21500, 20000, GeoUnit.KM);

            System.out.println("Command: geosearch wrongkey frommember Paris bybox 21500 20000 km | Result: ");
            printSearchResult(searchResult, false, false);

            /**
             * Use non existing member name
             * We get an error
             *
             * Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km
             * Result: (error) ERR could not decode requested zset member
             */
            try {
                searchResult = jedis.geosearch("bigboxcity", "wrongmember", 21500, 20000, GeoUnit.KM);

                System.out.println("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Result: ");
                printSearchResult(searchResult, false, false);
            } catch (Exception e) {
                System.out.println("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Error: " + e.getMessage());
            }

             /**
             * Use wrong key and wrong member name
             * We get empty array
             *
             * Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km
             * Result: (empty array)
             */
            searchResult = jedis.geosearch("wrongkey", "wrongmember", 21500, 20000, GeoUnit.KM);

            System.out.println("Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km | Result: ");
            printSearchResult(searchResult, false, false);

            /**
             * Set a string
             *
             * Command: set bigboxstr "some str here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some str here");

            System.out.println("Command: set bigboxstr \"some str here\" | Result: " + setResult);

            /**
             * Try to use a key that is not a geoindex
             * We get an error
             *
             * Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                searchResult = jedis.geosearch("bigboxstr", new GeoCoordinate(114.109497, 22.3982), 9000, GeoUnit.KM);

                System.out.println("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Result: ");
                printSearchResult(searchResult, false, false);
            } catch (Exception e) {
                System.out.println("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Error: " + e.getMessage());
            }

        }

        jedisPool.close();

    }

    static void printSearchResult(List<GeoRadiusResponse> searchResult, boolean showDistance, boolean showScore) {

        for (GeoRadiusResponse radiusResponse: searchResult) {
            ArrayList<String> result = new ArrayList<>();

            result.add("Member: " + radiusResponse.getMemberByString());

            if (showDistance) {
                result.add("Distance: " + radiusResponse.getDistance());
            }

            if (showScore) {
                result.add("Score: " + radiusResponse.getRawScore());
            }

            if (radiusResponse.getCoordinate() != null) {
                result.add("Longitude: " + radiusResponse.getCoordinate().getLongitude());
                result.add("Latitude: " + radiusResponse.getCoordinate().getLatitude());
            }

//            System.out.println("Hash Code: " + radiusResponse.hashCode());
            System.out.println(result);
        }
    }
}
