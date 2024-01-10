// Redis GEODIST command example in Java

import redis.clients.jedis.GeoCoordinate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.args.GeoUnit;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GeoDist {

    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Add city longitude and latitude to geoindex named bigboxcity
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
             * Check the items in bigboxcity
             * Command: zrange bigboxcity 0 -1
             * Result:
             *      1) "Rome"
             *      2) "Paris"
             *      3) "Bangkok"
             *      4) "Hong Kong"
             *      5) "Tokyo"
             */
            List<String> zrangeResult = jedis.zrange("bigboxcity", 0, -1);

            System.out.println("Command: zrange bigboxcity 0 -1 withscores | Result: " + zrangeResult.toString());

            /**
             * Check distance of Paris and Tokyo
             * This distance is in meter unit, as meter is the default
             *
             * Command: geodist bigboxcity Paris Tokyo
             * Result: "9714811.3348"
             */
            Double geodistResult = jedis.geodist("bigboxcity", "Paris", "Tokyo");

            System.out.println("Command: geodist bigboxcity Paris Tokyo | Result: " + geodistResult);

            /**
             * Check distance of Paris and Hong Kong
             * This distance is in kilometer as we provide km to the command
             *
             * Command: geodist bigboxcity Paris "Hong Kong" km
             * Result: "9618.5790"
             */
            geodistResult = jedis.geodist("bigboxcity", "Paris", "Hong Kong", GeoUnit.KM);

            System.out.println("Command: geodist bigboxcity Paris \"Hong Kong\" km | Result: " + geodistResult);

            /**
             * Distance to the same city will be zero
             *
             * Command: geodist bigboxcity Paris Paris
             * Result: "0.0000"
             */
            geodistResult = jedis.geodist("bigboxcity", "Paris", "Paris");

            System.out.println("Command: geodist bigboxcity Paris Paris | Result: " + geodistResult);

            /**
             * We get (nil) if one or both of the cities do not exist in our geoindex
             *
             * Command: geodist bigboxcity Paris "unknown city"
             * Result: (nil)
             */
            geodistResult = jedis.geodist("bigboxcity", "Paris", "unknown city");

            System.out.println("Command: geodist bigboxcity Paris \"unknown city\" | Result: " + geodistResult);

            /**
             * Set a string
             *
             * Command: set bigboxstr "test string here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "test string here");

            System.out.println("Command: set bigboxstr \"test string here\" | Result: " + setResult);

            /**
             * Try to add GEODIST on a string
             * We get a type error
             *
             * Command: geodist bigboxstr Paris Tokyo
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                geodistResult = jedis.geodist("bigboxstr", "Paris", "Tokyo");

                System.out.println("Command: geodist bigboxstr Paris Tokyo | Result: " + geodistResult);
            } catch (Exception e) {
                System.out.println("Command: geodist bigboxstr Paris Tokyo | Result: " + e.getMessage());
            }

        }

        jedisPool.close();

    }
}
