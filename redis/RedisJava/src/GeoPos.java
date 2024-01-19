// Redis GEOPOS command example in Java

import redis.clients.jedis.GeoCoordinate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class GeoPos {

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
             * Check geopos of a single member
             *
             * Command: geopos bigboxcity Paris
             * Result:
             *      1)  1) "2.35221952199935913"
             *          2) "48.85661220395509474"
             */
            List<GeoCoordinate> geoposResult = jedis.geopos("bigboxcity", "Paris");

            System.out.println("Command: geopos bigboxcity Paris | Result: " + geoposResult.toString());

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
            geoposResult = jedis.geopos("bigboxcity", "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok");

            System.out.println("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: " + geoposResult.toString());

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
            geoposResult = jedis.geopos("bigboxcity", "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok");

            System.out.println("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: " + geoposResult.toString());

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
            geoposResult = jedis.geopos("bigboxcity", "Tokyo", "Tokyo", "Tokyo");

            System.out.println("Command: geopos bigboxcity geopos bigboxcity Tokyo Tokyo Tokyo | Result: " + geoposResult.toString());

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
            geoposResult = jedis.geopos("bigboxcity", "wrongmember1", "wrongmember2", "wrongmember3");

            System.out.println("Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: " + geoposResult.toString());

            /**
             * Check the command without any member
             * We get an empty array
             *
             * Command: geopos bigboxcity
             * Result: (empty array)
             */
            geoposResult = jedis.geopos("bigboxcity");

            System.out.println("Command: geopos bigboxcity | Result: " + geoposResult.toString());

            /**
             * Pass a wrong non existing key
             * we get an empty array
             *
             * Command: geopos wrongkey
             * Result: (empty array)
             */
            geoposResult = jedis.geopos("wrongkey");

            System.out.println("Command: geopos wrongkey | Result: " + geoposResult.toString());

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
            geoposResult = jedis.geopos("wrongkey", "membera", "memberb", "memberc");

            System.out.println("Command: geopos wrongkey membera memberb memberc | Result: " + geoposResult.toString());

            /**
             * Set string value
             *
             * Command: set bigboxstr "some string here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "soem string here");

            System.out.println("Command: set bigboxstr \"some string here\" | Result: " + setResult);

            /**
             * Try to use GEOPOS with some key that is not a geindex
             * We get an error, for using key of wrong type
             *
             * Command: geopos bigboxstr abc
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                geoposResult = jedis.geopos("bigboxstr", "abc");

                System.out.println("Command: geopos bigboxstr abc | Result: " + geoposResult.toString());
            } catch (Exception e) {
                System.out.println("Command: geopos bigboxstr abc | Error: " + e.getMessage());
            }

        }

        jedisPool.close();

    }
}
