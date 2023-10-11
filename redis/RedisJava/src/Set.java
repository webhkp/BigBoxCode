// Redis SET command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.params.SetParams;

public class Set {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool pool = new JedisPool("localhost", 6379);

        try (Jedis jedis = pool.getResource()) {
            /**
             * Set value for a key
             *
             * Command: set firstkey "abcdef"
             * Result: OK
             */
            String commandResult = jedis.set("firstkey", "abcdef");

            System.out.println("Command: set firstkey \"abcdef\" | Result: " + commandResult);


            /**
             * Command: get firstkey
             * Result: "abcdef"
             */
            commandResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + commandResult);


            /**
             * Set value for the same key again. The new value is set for the key
             *
             * Command: set firstkey defghi
             * Result: OK
             */
            commandResult = jedis.set("firstkey", "defghi");

            System.out.println("Command: set firstkey defghi | Result: " + commandResult);


            /**
             * Command: get firstkey
             * Result: "defghi"
             */
            commandResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + commandResult);


            /**
             * Use "XX" option to set value only if the key already exists
             *
             * Command: set secondkey "000000000000" XX
             * Result: (nil)
             */
            commandResult = jedis.set("secondkey", "000000000000", SetParams.setParams().xx());

            System.out.println("Command: set secondkey \"000000000000\" XX | Result: " + commandResult);


            /**
             * secondkey is not set in this case as it was not preexisting
             *
             * Command: get secondkey
             * Result: (nil)
             */
            commandResult = jedis.get("secondkey");

            System.out.println("Command: get secondkey | Result: " + commandResult);


            /**
             * Use "NX" option to set value if the key does not exist
             *
             * Command: set secondkey "000000000000" NX
             * Result: OK
             */
            commandResult = jedis.set("secondkey", "000000000000", SetParams.setParams().nx());

            System.out.println("Command: set secondkey \"000000000000\" NX | Result: " + commandResult);


            /**
             * secondkey is set as it was not pre-existing
             *
             * Command: get secondkey
             * Result: "000000000000"
             */
            commandResult = jedis.get("secondkey");

            System.out.println("Command: get secondkey | Result: " + commandResult);


            /**
             * Use "NX" for an existing key, that returns nil
             *
             * Command: set firstkey "work idea" NX
             * Result: (nil)
             */
            commandResult = jedis.set("firstkey", "work idea", SetParams.setParams().nx());

            System.out.println("Command: set firstkey \"work idea\" NX | Result: " + commandResult);


            /**
             * Command: get firstkey
             * Result: "defghi"
             */
            commandResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + commandResult);


            /**
             * Pass the "GET" option to get the previous value.
             * If the value was not set previously then we get nil
             *
             * Command: set thirdkey 1111111111 GET
             * Result: (nil)
             */
            commandResult = jedis.set("thirdkey", "1111111111", SetParams.setParams());

            System.out.println("Command: set thirdkey 1111111111 GET | Result: " + commandResult);


            /**
             * Pass "GET" to fetch the previous value before setting new value
             *
             * Command: set thirdkey 99999999 GET
             * Result: "1111111111"
             */
            commandResult = jedis.setGet("thirdkey", "99999999");

            System.out.println("Command: set thirdkey 99999999 GET | Result: " + commandResult);


            /**
             * Set expire time in seconds using "EX" option (other expire duration related options work the same way)
             *
             * Command: set fourthkey "some value for expire" EX 120
             * Result: OK
             */
            commandResult = jedis.set("fourthkey", "some value for expire", SetParams.setParams().ex(120));

            System.out.println("Command: set fourthkey \"some value for expire\" EX 120 | Result: " + commandResult);


            /**
             * Command: ttl fourthkey
             * Result: (integer) 120
             */
            long ttl = jedis.ttl("fourthkey");

            System.out.println("Command: ttl fourthkey | Result: " + ttl);


            /**
             * Set expire time
             *
             * Command: set mykey "some val" ex 360
             * Result: OK
             */
            commandResult = jedis.set("mykey", "some val", SetParams.setParams().ex(360));

            System.out.println("Command: set mykey \"some val\" ex 360 | Result: " + commandResult);


            /**
             * Command: ttl mykey
             * Result: (integer) 360
             */
            ttl = jedis.ttl("mykey");

            System.out.println("Command: ttl mykey | Result: " + ttl);


            /**
             * Setting already existing key will remove the TTL if there is any
             *
             * Command: set mykey "changed value"
             * Result: OK
             */
            commandResult = jedis.set("mykey", "changed value");

            System.out.println("Command: set mykey \"changed value\" | Result: " + commandResult);


            /**
             * TTL was removed as the value was set the second time without any expire time
             *
             * Command: ttl mykey
             * Result: (integer) -1
             */
            ttl = jedis.ttl("mykey");

            System.out.println("Command: ttl mykey | Result: " + ttl);


            /**
             * Set value with expire time - the following commands are for checking "KEEPTTL" option
             *
             * Command: set user:10 "John Doe" ex 360
             * Result: OK
             */
            commandResult = jedis.set("user:10", "John Doe", SetParams.setParams().ex(360));

            System.out.println("Command: set user:10 \"John Doe\" ex 360 | Result: " + commandResult);


            /**
             * Command: ttl user:10
             * Result: (integer) 360
             */
            ttl = jedis.ttl("user:10");

            System.out.println("Command: ttl user:10 | Result: " + ttl);


            /**
             * Set value for the same key, and pass "KEEPTTL" option. This will keep the TTL that was associated with the key
             *
             * Command: set user:10 "Some user" keepttl
             * Result: OK
             */
            commandResult = jedis.set("user:10", "Some user", SetParams.setParams().keepTtl());

            System.out.println("Command: set user:10 \"Some user\" keepttl | Result: " + commandResult);


            /**
             * Lets check the TTL. The TTL still exists because of usign the "KEEPTTL" option
             *
             * Command: ttl user:10
             * Result: (integer) 360
             */
            ttl = jedis.ttl("user:10");

            System.out.println("Command: ttl user:10 | Result: " + ttl);

        }

        pool.close();
    }
}
