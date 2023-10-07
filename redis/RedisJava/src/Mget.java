import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.params.SetParams;

import java.util.List;

public class Mget {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {
            /**
             * Set some values
             *
             * Command: set firstkey "my first value"
             * Result: OK
             */
            String commandResult = jedis.set("firstkey", "my first value");

            System.out.println("Command: set firstkey \"my first value\" | Result: " + commandResult);


            /**
             * Command: set secondkey "bigboxcode"
             * Result: OK
             */
            commandResult = jedis.set("secondkey", "bigboxcode");

            System.out.println("Command: set secondkey \"bigboxcode\" | Result: " + commandResult);


            /**
             * Command: set user:100 "john"
             * Result: OK
             */
            commandResult = jedis.set("user:100", "john");

            System.out.println("Command: set user:100 \"john\" | Result: " + commandResult);


            /**
             * Try to get values for 3 keys
             *
             * Command: mget firstkey secondkey user:100
             * Result:
             *  1) "my first value"
             *  2) "bigboxcode"
             *  3) "john"
             */
            List<String> resultList = jedis.mget("firstkey", "secondkey", "user:100");

            System.out.println("Command: mget firstkey secondkey user:100 | Result: ");

            for (String item: resultList) {
                System.out.println(item);
            }


            /**
             * We get "nil" if the key deos not exist. Here the "wrongkey" does not exist
             *
             * Command: mget firstkey secondkey wrongkey
             * Result:
             *  1) "my first value"
             *  2) "bigboxcode"
             *  3) (nil)
             */
            resultList = jedis.mget("firstkey", "secondkey", "wrongkey");

            System.out.println("Command: mget firstkey secondkey wrongkey | Result: ");

            for (String item: resultList) {
                System.out.println(item);
            }


            /**
             * Here we are provideing "firstkey" multiple times
             *
             * Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey
             * Result:
             *  1) "my first value"
             *  2) "my first value"
             *  3) "bigboxcode"
             *  4) (nil)
             *  5) "john"
             *  6) "my first value"
             */
            resultList = jedis.mget("firstkey", "firstkey", "secondkey", "wrongkey", "user:100", "firstkey");

            System.out.println("Command: mget firstkey firstkey secondkey wrongkey user:100 firstkeymget firstkey firstkey secondkey wrongkey user:100 firstkey | Result: ");

            for (String item: resultList) {
                System.out.println(item);
            }

        }

        jedisPool.close();
    }
}
