// Redis GETEX example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.params.GetExParams;

import static java.lang.Thread.sleep;

public class Getex {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {
            /**
             * Set value for "sitename" key
             *
             * Command: set sitename "bigboxcode"
             * Result: OK
             */
            String commandResult = jedis.set("sitename", "bigboxcode");

            System.out.println("Command: set sitename \"bigboxcode\" | Result: " + commandResult);


            /**
             * Use the command without any expire part
             *
             * Command: getex sitename
             * Result: "bigboxcode"
             */
            commandResult = jedis.getEx("sitename", GetExParams.getExParams());

            System.out.println("Command: getex sitename | Result: " + commandResult);


            /**
             * Check TTL, and we get -1 as no expire time is set yet
             *
             * Command: ttl sitename
             * Result: (integer) -1
             */
            long ttlResult = jedis.ttl("sitename");

            System.out.println("Command: ttl sitename | Result: " + ttlResult);


            /**
             * Set 10 seconds expire time while getting get value back
             *
             * Command: getex sitename ex 10
             * Result: "bigboxcode"
             */
            commandResult = jedis.getEx("sitename", GetExParams.getExParams().ex(10));

            System.out.println("Command: getex sitename ex 10 | Result: " + commandResult);


            /**
             * Check TTL now, there should be some TTL(if checked within 10 seconds)
             *
             * Command: ttl sitename
             * Result: (integer) 10
             */
            ttlResult = jedis.ttl("sitename");

            System.out.println("Command: ttl sitename | Result: " + commandResult);


            // Sleep for 10 seconds
            System.out.println("Sleep 10 sec");
            sleep(10 * 1000);


            /**
             * Check after 10 seconds. The key has expired
             *
             * Command: get sitename
             * Result: (nil)
             */
            commandResult = jedis.get("sitename");

            System.out.println("Command: get sitename | Result: " + commandResult);

            /**
             * Set value for a key
             *
             * Command: set sitename bigboxcode
             * Result: OK
             */
            commandResult = jedis.set("sitename", "bigboxcode");

            System.out.println("Command: set sitename bigboxcode | Result: " + commandResult);


            /**
             * Set 120 seconds expire time while getting the value
             *
             * Command: getex sitename ex 120
             * Result: "bigboxcode"
             */
            commandResult = jedis.getEx("sitename", GetExParams.getExParams().ex(120));

            System.out.println("Command: getex sitename ex 120 | Result: " + commandResult);


            /**
             * Check TTL, there should be some TTL (if checked within 120 seconds)
             * Command: ttl sitename
             * Result: (integer) 117
             */
            ttlResult = jedis.ttl("sitename");

            System.out.println("Command: ttl sitename | Result: " + ttlResult);


            /**
             * Pass persist to remove the expire time from the key
             * Command: getex sitename persist
             * Result: "bigboxcode"
             */
            commandResult = jedis.getEx("sitename", GetExParams.getExParams().persist());

            System.out.println("Command: getex sitename persist | Result: " + commandResult);


            /**
             * Check the TTL now, there will be no TTL as the expire time is removed
             * Command: ttl sitename
             * Result: (integer) -1
             */
            ttlResult = jedis.ttl("sitename");

            System.out.println("Command: ttl sitename | Result: " + ttlResult);


            /**
             * Try getting value and set expire time for a key that does not exist. We get nil as the ke does not exist
             * Command: getex wrongkey ex 360
             * Result: (nil)
             */
            commandResult = jedis.getEx("wrongkey", GetExParams.getExParams().ex(360));

            System.out.println("Command: getex wrongkey ex 360 | Result: " + commandResult);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        jedisPool.close();
    }
}
