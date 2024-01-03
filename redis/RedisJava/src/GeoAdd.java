// Redis GEOADD command example in Java

import redis.clients.jedis.GeoCoordinate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.params.GeoAddParams;
import redis.clients.jedis.resps.Tuple;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GeoAdd {

    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Add single location
             * Command: geoadd bigboxcity 2.352222 48.856613 Paris
             * Result: (integer) 1
             */
            long getaddResult = jedis.geoadd("bigboxcity", 2.352222, 48.85661, "Paris");

            System.out.println("Command: geoadd bigboxcity 2.352222 48.856613 Paris | Result: " + getaddResult);

            /**
             * Add multiple location data
             * Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
             * Result: (integer) 4
             */
            Map<String, GeoCoordinate> locationData = new HashMap<>() {{
                put("Bangkok", new GeoCoordinate(100.501762, 13.756331));
                put("Hong Kong", new GeoCoordinate(114.109497, 22.396427));
                put("Tokyo", new GeoCoordinate(139.691711, 35.689487));
                put("Rome", new GeoCoordinate(12.496365, 41.90278));
            }};
            getaddResult = jedis.geoadd("bigboxcity", locationData);

            System.out.println("Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: " + getaddResult);

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
            List<Tuple> zrangeResult = jedis.zrangeWithScores("bigboxcity", 0, -1);

            System.out.println("Command: zrange bigboxcity 0 -1 withscores | Result: " + zrangeResult.toString());

            /**
             * Try to add only if the record does not exit
             * Command: geoadd bigboxcity NX 2.352222 48.856613 Paris
             * Result: (integer) 0
             */
            locationData = new HashMap<>() {{
                put("Paris", new GeoCoordinate(2.352222, 48.856613));
            }};
            getaddResult = jedis.geoadd("bigboxcity", GeoAddParams.geoAddParams().nx(), locationData);

            System.out.println("Command: geoadd bigboxcity NX 2.352222 48.856613 Paris | Result: " + getaddResult);

            /**
             * Check the location data
             * Command: geopos bigboxcity Paris
             * Result:
             *      1) 1) "2.35221952199935913"
             *      2) "48.85661220395509474"
             */
            List<GeoCoordinate> geoposResult = jedis.geopos("bigboxcity", "Paris");

            System.out.println("Command: geopos bigboxcity Paris | Result: " + geoposResult.toString());

            /**
             * Add/change only if it exits
             * Command: geoadd bigboxcity XX 2.352222 48.856615 Paris
             * Result: (integer) 0
             */
            locationData = new HashMap<>() {{
                put("Paris", new GeoCoordinate(2.352222, 48.856615));
            }};
            getaddResult = jedis.geoadd("bigboxcity", GeoAddParams.geoAddParams().xx(), locationData);

            System.out.println("Command: geoadd bigboxcity XX 2.352222 48.856615 Paris | Result: " + getaddResult);

            /**
             * Check location data
             * It is changed by the previous GEOADD command
             * Command: geopos bigboxcity Paris
             * Result:
             *      1) 1) "2.35221952199935913"
             *      2) "48.85661473867625659"
             */
            geoposResult = jedis.geopos("bigboxcity", "Paris");

            System.out.println("Command: geopos bigboxcity Paris | Result: " + geoposResult.toString());

            /**
             * Add/change location data
             * and return the total number of items changed(added or update)
             * Command: geoadd bigboxcity CH 2.352222 48.856612 Paris
             * Result: (integer) 1
             */
            locationData = new HashMap<>() {{
                put("Paris", new GeoCoordinate(2.352222, 48.856612));
            }};
            getaddResult = jedis.geoadd("bigboxcity", GeoAddParams.geoAddParams().ch(), locationData);

            System.out.println("Command: geoadd bigboxcity CH 2.352222 48.856612 Paris | Result: " + getaddResult);

            /**
             * Check location. it is changed by the preivous command
             * Command: geopos bigboxcity Paris
             * Result:
             *      1) 1) "2.35221952199935913"
             *      2) "48.85661220395509474"
             */
            geoposResult = jedis.geopos("bigboxcity", "Paris");

            System.out.println("Command: geopos bigboxcity Paris | Result: " + geoposResult.toString());

            /**
             * Try to use value that is out of range
             * We get an error, which indicates vlaue is out of range
             * Command: geoadd bigboxcity 200 80 "Out of range"
             * Result: (error) ERR invalid longitude,latitude pair 200.000000,80.000000
             */
            try {
                getaddResult = jedis.geoadd("bigboxcity", 200, 80, "Out of range");

                System.out.println("Command: geoadd bigboxcity 200 80 \"Out of range\" | Result: " + getaddResult);
            } catch (Exception e) {
                System.out.println("Command: geoadd bigboxcity 200 80 \"Out of range\" | Result: " + e.getMessage());
            }

            /**
             * Set a string value
             * Command: set bigboxstr "my string for testing"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "my string for testing");

            System.out.println("Command: set bigboxstr \"my string for testing\" | Result: " + setResult);

            /**
             * Try to use the string key for GETADD command
             * We get an error, which indicates the type of key is wrong
             * Command: geoadd bigboxstr 37.617298 55.755825 Moscow
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                getaddResult = jedis.geoadd("bigboxstr", 37.617298, 55.755825, "Moscow");

                System.out.println("Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: " + getaddResult);
            } catch (Exception e) {
                System.out.println("Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: " + e.getMessage());
            }

        }

        jedisPool.close();

    }
}
