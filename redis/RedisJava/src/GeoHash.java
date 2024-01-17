// Redis GEOHASH command example in Java

import redis.clients.jedis.GeoCoordinate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class GeoHash {

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
             * Check geohash of a single member
             *
             * Command: geohash bigboxcity Paris
             * Result:
             *      1) "u09tvw0f6s0"
             */
            List<String> geohashResult = jedis.geohash("bigboxcity", "Paris");

            System.out.println("Command: geohash bigboxcity Paris | Result: " + geohashResult.toString());

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
            geohashResult = jedis.geohash("bigboxcity", "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok");

            System.out.println("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: " + geohashResult.toString());

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
            geohashResult = jedis.geohash("bigboxcity", "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok");

            System.out.println("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: " + geohashResult.toString());

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
            geohashResult = jedis.geohash("bigboxcity", "wrongmember1", "wrongmember2", "wrongmember3");

            System.out.println("Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: " + geohashResult.toString());

            /**
             * Check the command without any member
             * We get an empty array
             *
             * Command: geohash bigboxcity
             * Result: (empty array)
             */
            geohashResult = jedis.geohash("bigboxcity");

            System.out.println("Command: geohash bigboxcity | Result: " + geohashResult.toString());

            /**
             * Pass a wrong non existing key
             * we get an empty array
             *
             * Command: geohash wrongkey
             * Result: (empty array)
             */
            geohashResult = jedis.geohash("wrongkey");

            System.out.println("Command: geohash wrongkey | Result: " + geohashResult.toString());

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
            geohashResult = jedis.geohash("wrongkey", "membera", "memberb", "memberc");

            System.out.println("Command: geohash wrongkey membera memberb memberc | Result: " + geohashResult.toString());

            /**
             * Set string value
             *
             * Command: set bigboxstr "some string here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "soem string here");

            System.out.println("Command: set bigboxstr \"some string here\" | Result: " + setResult);

            /**
             * Try to use GEOHASH with some key that is not a geindex
             * We get an error, for using key of wrong type
             *
             * Command: geohash bigboxstr abc
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                geohashResult = jedis.geohash("bigboxstr", "abc");

                System.out.println("Command: geohash bigboxstr abc | Result: " + geohashResult.toString());
            } catch (Exception e) {
                System.out.println("Command: geohash bigboxstr abc | Error: " + e.getMessage());
            }

        }

        jedisPool.close();

    }
}
