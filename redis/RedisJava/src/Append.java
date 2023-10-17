// Redis APPEND example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Append {

    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Check firstkey, it not exist
             * Command: get firstkey
             * Result: (nil)
             */
            String getResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + getResult);

            /**
             * Append "abc" to the firstkey.
             * As firstkey does not already exist, so it will be created and "abc" will be appended to that.
             * After append the length of firstkey value is three(3), so "3" is returned
             * Command: append firstkey "abc"
             * Result: (integer) 3
             */
            long intResult = jedis.append("firstkey", "abc");

            System.out.println("Command: append firstkey \"abc\" | Result: " + intResult);

            /**
             * Check firstkey, we get "abc"
             * Command: get firstkey
             * Result: "abc"
             */
            getResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + getResult);

            /**
             * Append "def" to firstkey.
             * As firstkey already has "abc" as value, if "def" is appended then firstkey value becomes "abcdef".
             * After append the total length of firstkey value is six(6) so "6" is returned as result.
             * Command: append firstkey "def"
             * Result: (integer) 6
             */
            intResult = jedis.append("firstkey", "def");

            System.out.println("Command: append firstkey \"def\" | Result: " + intResult);

            /**
             * Check firstkey, we get "abcded"
             * Command: get firstkey
             * Result: "abcdef"
             */
            getResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + getResult);

            /**
             * Check the length of firstkey and we get six(6)
             * Command: strlen firstkey
             * (integer) 6
             */
            intResult = jedis.strlen("firstkey");

            System.out.println("Command: strlen firstkey | Result: " + intResult);

            /**
             * Let's check with another key, secondkey, it is not set yet.
             * Command: get secondkey
             * Result: (nil)
             */
            getResult = jedis.get("secondkey");

            System.out.println("Command: get secondkey | Result: " + getResult);

            /**
             * Append a blank string "" to secondkey.
             * secondkey will be create and blank sring "" will be appended to it.
             * As a result the value os second key becomes a blank string "", and length becomes zero(0)
             * Zero(0) is returned as result
             * Command: append secondkey ""
             * Result: (integer) 0
             */
            intResult = jedis.append("secondkey", "");

            System.out.println("Command: append secondkey \"\" | Result: " + intResult);

            /**
             * Check secondkey
             * Command: get secondkey
             * Result: ""
             */
            getResult = jedis.get("secondkey");

            System.out.println("Command: get secondkey | Result: " + getResult);

            /**
             * Check secondkey length
             * Command: strlen secondkey
             * Result: (integer) 0
             */
            intResult = jedis.strlen("secondkey");

            System.out.println("Command: strlen secondkey | Result: " + intResult);

            /**
             * Create a list
             * Command: lpush mylist abc
             * Result: (integer) 1
             */
            long lpushCommandResult = jedis.lpush("mylist", "abc");

            System.out.println("Command: lpush mylist abc | Result: " + lpushCommandResult);

            /**
             * Try to append string to the list type. Returns error
             * Command: append mylist 98
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                intResult = jedis.append("mylist", "98");

                System.out.println("Command: append mylist 98 | Result: " + intResult);
            } catch (Exception e) {
                System.out.println("Command: append mylist 98 | Error: " + e.getMessage());
            }

        }
    }

}
