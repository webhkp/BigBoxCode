// Redis SADD command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.Set;

public class SAdd {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Add members to set
             * Command: sadd bigboxset "first item" "second item" "third item" "just another item"
             * Result: (integer) 4
             */
            long saddResult = jedis.sadd("bigboxset", "first item", "second item", "third item", "just another item");

            System.out.println("Command: sadd bigboxset \"first item\" \"second item\" \"third item\" \"just another item\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third item"
             *      4) "just another item"
             */
            Set<String> smembersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smembersResult.toString());

            /**
             * Add members to set
             * Trying to add some already existing members. The existing members are ignored by the command.
             *
             * Command: sadd bigboxset "second item" "New item one" "first item" "New item two"
             * Result: (integer) 2
             */
            saddResult = jedis.sadd("bigboxset", "second item", "New item one", "first item", "New item two");

            System.out.println("Command: sadd bigboxset \"second item\" \"New item one\" \"first item\" \"New item two\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             *
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third item"
             *      4) "just another item"
             *      5) "New item one"
             *      6) "New item two"
             */
            smembersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smembersResult.toString());

            /**
             * Try to add member using SADD, to a non-existing key
             * Key is created and members are added
             *
             * Command: sadd nonexistingset one two three
             * Result: (integer) 3
             */
            saddResult = jedis.sadd("nonexistingset", "one", "two", "three");

            System.out.println("Command: sadd nonexistingset one two three | Result: " + saddResult);

            /**
             * Check set members
             *
             * Command: smembers nonexistingset
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             */
            smembersResult = jedis.smembers("nonexistingset");

            System.out.println("Command: smembers nonexistingset | Result: " + smembersResult.toString());

            /**
             * Set a string key
             * Command: set bigboxstr "some string value"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some string value");

            System.out.println("Command: set bigboxstr \"some string value\" | Result: " + setResult);

            /**
             * Try to use SADD on the string key
             * We get an error
             *
             * Command: sadd bigboxstr "some element"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                saddResult = jedis.sadd("bigboxstr", "some element");

                System.out.println("Command: sadd bigboxstr \"some element\" | Result: " + saddResult);
            } catch (Exception e) {
                System.out.println("Command: sadd bigboxstr \"some element\" | Error: " + e.getMessage());
            }

        }
    }
}
