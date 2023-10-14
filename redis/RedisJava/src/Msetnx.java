// Redis MSETNX example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Msetnx {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set 2 values if they do not already exist. Both are set successfully
             *
             * Command: msetnx firstkey "first value" secondkey "second value"
             * Result: (integer) 1
             */
            long setCommandResult = jedis.msetnx("firstkey", "first value", "secondkey", "second value");

            System.out.println("Command: msetnx firstkey \"first value\" secondkey \"second value\" | Result: " + setCommandResult);

            /**
             * Try to get values for 3 keys
             *
             * Command: mget firstkey secondkey
             * Result:
             *      1) "my first value"
             *      2) "second value"
             */
            List<String> resultList = jedis.mget("firstkey", "secondkey");

            System.out.println("Command: mget firstkey secondkey | Result: ");

            for (String item : resultList) {
                System.out.println(item);
            }

            /**
             * Set 2 values. Returns 0 as "firstkey" already exists
             *
             * Command: msetnx newkey "new value" firstkey "changed first value"
             * Result: (integer) 0
             */
            setCommandResult = jedis.msetnx("newkey", "new value", "firstkey", "changed first value");

            System.out.println("Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Result: " + setCommandResult);

            /**
             * Check value, and it is not set
             *
             * Command: get newkey
             * Result: (nil)
             */
            String getCommandResult = jedis.get("newkey");

            System.out.println("Command: get newkey | Result: " + getCommandResult);

            /**
             * Check firstkey, and it has old value
             *
             * Command: get firstkey
             * Result: "first value"
             */
            getCommandResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + getCommandResult);

            /**
             * Pass same key multiple times
             *
             * Command: msetnx newkey "new value" newkey "another new value"
             * Result: (integer) 1
             */
            setCommandResult = jedis.msetnx("newkey", "new value", "newkey", "another new value");

            System.out.println("Command: msetnx newkey \"new value\" newkey \"another new value\" | Result: " + setCommandResult);

            /**
             * newkey has the value that was set/provided later
             *
             * Command: get newkey
             * Result: "another new value"
             */
            getCommandResult = jedis.get("newkey");

            System.out.println("Command: get newkey | Result: " + getCommandResult);
        }

        jedisPool.close();
    }
}
