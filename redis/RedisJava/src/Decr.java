// Redis DECR command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Decr {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set the value of user:23:score key to 85
             *
             * Command: set user:23:score 85
             * Result: OK
             */
            String commandResult = jedis.set("user:23:score", "85");

            System.out.println("Command: set user:23:score 85 | Result: " + commandResult);

            /**
             * decreament value of user:23:score
             *
             * Command: decr user:23:score
             * Result: (integer) 84
             */
            long decrResult = jedis.decr("user:23:score");

            System.out.println("Command: decr user:23:score | Result: " + decrResult);

            /**
             * Check value of user:23:score key
             *
             * Command: get user:23:score
             * Result: "84"
             */
            commandResult = jedis.get("user:23:score");

            System.out.println("Command: get user:23:score | Result: " + commandResult);

            /**
             * Check type of user:23:score
             *
             * Command: type user:23:score
             * Result: string
             */
            commandResult = jedis.type("user:23:score");

            System.out.println("Command: type user:23:score | Result: " + commandResult);


            /**
             * Check if some key named "unknownkey" exists
             * it does not exist yet
             *
             * Command: get unknownkey
             * Result: (nil)
             */
            commandResult = jedis.get("unknownkey");

            System.out.println("Command: get unknownkey | Result: " + commandResult);

            /**
             * Try to decreament the value of "unknownkey" using decr command
             * The value of "unknownkey" is decreamented to 1
             *
             * Command: decr unknownkey
             * Result: (integer) -1
             */
            decrResult = jedis.decr("unknownkey");

            System.out.println("Command: decr unknownkey | Result: " + decrResult);

            /**
             * Check the value of "unknownkey"
             *
             * Command: get unknownkey
             * Result: "-1"
             */
            commandResult = jedis.get("unknownkey");

            System.out.println("Command: get unknownkey | Result: " + commandResult);


            /**
             * Set a string vlaue to sitename key
             *
             * Command: set sitename bigboxcode
             * Result: OK
             */
            commandResult = jedis.set("sitename", "bigboxcode");

            System.out.println("Command: set sitename bigboxcode | Result: " + commandResult);

            /**
             * Try to apply DECR command to sitename
             * We get an error as the value in sitename key is not an integer
             *
             * Command: decr sitename
             * Result: (error) ERR value is not an integer or out of range
             */
            try {
            decrResult = jedis.decr("sitename");

            System.out.println("Command: decr sitename | Result: " + decrResult);
            } catch (Exception e) {
                System.out.println("Command: decr sitename | Error: " + e.getMessage());
            }


            /**
             * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
             * Let's set the value of key "mymaxtest" to a value more than that
             *
             * Command: set mymaxtest 9223372036854775810
             * Result: OK
             */
            commandResult = jedis.set("mymaxtest", "9223372036854775810");

            System.out.println("Command: set mymaxtest 9223372036854775810 | Result: " + commandResult);

            /**
             * Let's decreament the vlaue of "mymaxtest"
             * We get an error
             *
             * Command: decr mymaxtest
             * Result: (error) ERR value is not an integer or out of range
             */
            try {
                decrResult = jedis.decr("mymaxtest");

                System.out.println("Command: decr mymaxtest | Result: " + decrResult);
            } catch (Exception e) {
                System.out.println("Command: decr mymaxtest | Error: " + e.getMessage());
            }


            /**
             * Min value allowed as 64-bit int is -9,223,372,036,854,775,808
             * Lets set a value close to that, -9,223,372,036,854,775,807
             *
             * Command: set mymintest  -9223372036854775807
             * Result: OK
             */
            commandResult = jedis.set("mymintest", "-9223372036854775807");

            System.out.println("Command: set mymintest  -9223372036854775807 | Result: " + commandResult);

            /**
             * Try to decr the value, it will work as it is still in range
             *
             * Command: decr mymintest
             * Result: (integer) -9223372036854775808
             */
            decrResult = jedis.decr("mymintest");

            System.out.println("Command: decr mymintest | Result: " + decrResult);

            /**
             * If we try to decrease once again we get error
             *
             * Command: decr mymintest
             * Result: (error) ERR increment or decrement would overflow
             */
            try {
                decrResult = jedis.decr("mymintest");

                System.out.println("Command: decr mymintest | Result: " + decrResult);
            } catch (Exception e) {
                System.out.println("Command: decr mymintest | Error: " + e.getMessage());
            }

        }

        jedisPool.close();

    }
}
