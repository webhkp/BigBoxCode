// Redis INCR command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Incr {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set the value of total-user-no key to 10
             *
             * Command: set total-user-no 10
             * Result: OK
             */
            String setResult = jedis.set("total-user-no", "10");

            System.out.println("Command: set total-user-no 10 | Result: " + setResult);

            /**
             * Increment value of total-user-no
             *
             * Command: incr total-user-no
             * Result: (integer) 11
             */
            long incrResult = jedis.incr("total-user-no");

            System.out.println("Command: incr total-user-no | Result: " + incrResult);

            /**
             * Check value of total-user-no key
             * Command: get total-user-no
             * Result: "11"
             */
            String getResult = jedis.get("total-user-no");

            System.out.println("Command: get total-user-no | Result: " + getResult);

            /**
             * Check type of total-user-no
             * Command: type total-user-no
             * Result: string
             */
            String typeResult = jedis.type("total-user-no");

            System.out.println("Command: type total-user-no | Result: " + typeResult);

            /**
             * Check if some key named "unknownkey" exists
             * it does not exist yet
             * Command: get unknownkey
             * Result: (nil)
             */
            getResult = jedis.get("unknownkey");

            System.out.println("Command: get unknownkey | Result: " + getResult);

            /**
             * Try to increament the value of "unknownkey" using INCR command
             * The value of "unknownkey" is increamented to 1
             * Command: incr unknownkey
             * Result: (integer) 1
             */
            incrResult = jedis.incr("unknownkey");

            System.out.println("Command: incr unknownkey | Result: " + incrResult);

            /**
             * Check the value of "unknownkey"
             * Command: get unknownkey
             * Result: "1"
             */
            getResult = jedis.get("unknownkey");

            System.out.println("Command: get unknownkey | Result: " + getResult);

            /**
             * Set a string vlaue to sitename key
             * Command: set sitename bigboxcode
             * Result: OK
             */
            setResult = jedis.set("sitename", "bigboxcode");

            System.out.println("Command: set sitename bigboxcode | Result: " + setResult);

            /**
             * Try to apply INCR command to sitename
             * We get an error as the value in sitename key is not an integer
             * Command: incr sitename
             * Result: (error) ERR value is not an integer or out of range
             */
            try {
                incrResult = jedis.incr("sitename");

                System.out.println("Command: incr sitename | Result: " + incrResult);
            } catch (Exception e) {
                System.out.println("Command: incr sitename | Error: " + e.getMessage());
            }

            /**
             * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
             * Let's set the value of key "mymaxtest" to a value close to the max value
             * Command: set mymaxtest 9223372036854775806
             * Result: OK
             */
            setResult = jedis.set("mymaxtest", "9223372036854775806");

            System.out.println("Command: set mymaxtest 9223372036854775806 | Result: " + setResult);

            /**
             * Let's increament the vlaue of "mymaxtest"
             * It reaches the max value
             * Command: incr mymaxtest
             * Result: (integer) 9223372036854775807
             */
            incrResult = jedis.incr("mymaxtest");

            System.out.println("Command: incr mymaxtest | Result: " + incrResult);

            /**
             * Let's try to increase the value of "mymaxtest"
             * We get an error as it goes beyond the max value
             * Command: incr mymaxtest
             * Result: (error) ERR increment or decrement would overflow
             */
            try {
                incrResult = jedis.incr("mymaxtest");

                System.out.println("Command: incr mymaxtest | Result: " + incrResult);
            } catch (Exception e) {
                System.out.println("Command: incr sitename | Error: " + e.getMessage());
            }
        }
    }
}
