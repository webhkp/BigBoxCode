// Redis LPOS command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.params.LPosParams;

import java.util.List;

public class Lpos {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push items to list
             *
             * Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine
             * Result: (integer) 15
             */
            long listPushResult = jedis.rpush("bigboxlist", "one", "two", "three", "four", "five", "one", "testA", "two", "testB", "testC", "one", "two", "nine", "one", "nine");

            System.out.println("Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine | Result:" + listPushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "four"
             *      5) "five"
             *      6) "one"
             *      7) "testA"
             *      8) "two"
             *      9) "testB"
             *      10) "testC"
             *      11) "one"
             *      12) "two"
             *      13) "nine"
             *      14) "one"
             *      15) "nine"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Check first index of "one"
             *
             * Command: lpos bigboxlist one
             * Result: (integer) 0
             */
            Long lposResult = jedis.lpos("bigboxlist", "one");

            System.out.println("Command: lpos bigboxlist one | Result: " + lposResult);

            /**
             * Check first index of "two"
             *
             * Command: lpos bigboxlist two
             * Result: (integer) 1
             */
            lposResult = jedis.lpos("bigboxlist", "two");

            System.out.println("Command: lpos bigboxlist two | Result: " + lposResult);

            /**
             * Check first index of "five"
             *
             * Command: lpos bigboxlist five
             * Result: (integer) 4
             */
            lposResult = jedis.lpos("bigboxlist", "five");

            System.out.println("Command: lpos bigboxlist five | Result: " + lposResult);

            /**
             * Check second occurrence of "one"
             *
             * Command: lpos bigboxlist one rank 2
             * Result: (integer) 5
             */
            LPosParams lposOption = LPosParams.lPosParams().rank(2);
            lposResult = jedis.lpos("bigboxlist", "one", lposOption);

            System.out.println("Command: lpos bigboxlist one rank 2 | Result: " + lposResult);

            /**
             * Check 5th occurrence of "one"
             * We get (nil) as this item occurs less than 5 times
             *
             * Command: lpos bigboxlist one rank 5
             * Result: (nil)
             */
            lposOption = LPosParams.lPosParams().rank(5);
            lposResult = jedis.lpos("bigboxlist", "one", lposOption);

            System.out.println("Command: lpos bigboxlist one rank 5 | Result: " + lposResult);

            /**
             * Get first 2 occurrance of "one"
             *
             * Command: lpos bigboxlist one count 2
             * Result:
             *      1) (integer) 0
             *      2) (integer) 5
             */
            List<Long> lposResults = jedis.lpos("bigboxlist", "one", LPosParams.lPosParams(), 2);

            System.out.println("Command: lpos bigboxlist one count 2 | Result: " + lposResults.toString());

            /**
             * Try to get first 8 occurrences of "one"
             * We get only 4 indexes, as "one" is there only 4 times in the list
             *
             * Command: lpos bigboxlist one count 8
             * Result:
             *      1) (integer) 0
             *      2) (integer) 5
             *      3) (integer) 10
             *      4) (integer) 13
             */
            lposResults = jedis.lpos("bigboxlist", "one", LPosParams.lPosParams(), 8);

            System.out.println("Command: lpos bigboxlist one count 8 | Result: " + lposResults.toString());

            /**
             * Pass count as 0 to return all occurrences
             *
             * Command: lpos bigboxlist one count 0
             * Result:
             *      1) (integer) 0
             *      2) (integer) 5
             *      3) (integer) 10
             *      4) (integer) 13
             */
            lposResults = jedis.lpos("bigboxlist", "one", LPosParams.lPosParams(), 0);

            System.out.println("Command: lpos bigboxlist one count 0 | Result: " + lposResults.toString());

            /**
             * Get 2 occurrences of "one" starting from the 2nd occurrance
             *
             * Command: lpos bigboxlist one rank 2 count 2
             * Result:
             *      1) (integer) 5
             *      2) (integer) 10
             */
            lposOption = LPosParams.lPosParams().rank(2);
            lposResults = jedis.lpos("bigboxlist", "one", lposOption, 2);

            System.out.println("Command: lpos bigboxlist one rank 2 count 2 | Result: " + lposResults.toString());

            /**
             * Get all occurrences of "one" starting from the 2nd occurrance
             *
             * Command: lpos bigboxlist one rank 2 count 0
             * Result:
             *      1) (integer) 5
             *      2) (integer) 10
             *      3) (integer) 13
             */
            lposOption = LPosParams.lPosParams().rank(2);
            lposResults = jedis.lpos("bigboxlist", "one", lposOption, 0);

            System.out.println("Command: lpos bigboxlist one rank 2 count 0 | Result: " + lposResults.toString());

            /**
             * Get one occurence from the end of the list
             *
             * Command: lpos bigboxlist one rank -1
             * Result: (integer) 13
             */
            lposOption = LPosParams.lPosParams().rank(-1);
            lposResult = jedis.lpos("bigboxlist", "one", lposOption);

            System.out.println("Command: lpos bigboxlist one rank -1 | Result: " + lposResult);

            /**
             * Get 3 occurences of "one" from the end
             *
             * Command: lpos bigboxlist one rank -1 count 3
             * Result:
             *      1) (integer) 13
             *      2) (integer) 10
             *      3) (integer) 5
             */
            lposOption = LPosParams.lPosParams().rank(-1);
            lposResults = jedis.lpos("bigboxlist", "one", lposOption, 3);

            System.out.println("Command: lpos bigboxlist one rank -1 count 3 | Result: " + lposResults.toString());

            /**
             * Try to get index of "two" withing first 1 item
             * (nil) is returned as "two" is not there is first 1 item
             *
             * Command: lpos bigboxlist two maxlen 1
             * Result: (nil)
             */
            lposOption = LPosParams.lPosParams().maxlen(1);
            lposResult = jedis.lpos("bigboxlist", "two", lposOption);

            System.out.println("Command: lpos bigboxlist two maxlen 1 | Result: " + lposResult);

            /**
             * Get index of "two" withing first 10 list items
             * We get the index 1, as this is the first occurence
             *
             * Command: lpos bigboxlist two maxlen 10
             * Result: (integer) 1
             */
            lposOption = LPosParams.lPosParams().maxlen(10);
            lposResult = jedis.lpos("bigboxlist", "two", lposOption);

            System.out.println("Command: lpos bigboxlist two maxlen 10 | Result: " + lposResult);

            /**
             * Get 2 occurrences of "two" withing first 10 items
             *
             * Command: lpos bigboxlist two count 2 maxlen 10
             * Result:
             *      1) (integer) 1
             *      2) (integer) 7
             */
            lposOption = LPosParams.lPosParams().maxlen(10);
            lposResults = jedis.lpos("bigboxlist", "two", lposOption, 2);

            System.out.println("Command: lpos bigboxlist two count 2 maxlen 10 | Result: " + lposResults.toString());

            /**
             * Get all occurrences of "two" withing first 10 items
             *
             * Command: lpos bigboxlist two count 0 maxlen 10
             * Result:
             *      1) (integer) 1
             *      2) (integer) 7
             */
            lposOption = LPosParams.lPosParams().maxlen(10);
            lposResults = jedis.lpos("bigboxlist", "two", lposOption, 0);

            System.out.println("Command: lpos bigboxlist two count 0 maxlen 10 | Result: " + lposResults.toString());

            /**
             * Get all occurrences of "two" withing first 15 items
             *
             * Command: lpos bigboxlist two count 0 maxlen 15
             * Result:
             *      1) (integer) 1
             *      2) (integer) 7
             *      3) (integer) 11
             */
            lposOption = LPosParams.lPosParams().maxlen(15);
            lposResults = jedis.lpos("bigboxlist", "two", lposOption, 0);

            System.out.println("Command: lpos bigboxlist two count 0 maxlen 15 | Result: " + lposResults.toString());

            /**
             * Get results from the end and consider 10 items from the end
             *
             * Command: lpos bigboxlist two maxlen 10 rank -1
             * Result: (integer) 11
             */
            lposOption = LPosParams.lPosParams().rank(-1).maxlen(10);
            lposResult = jedis.lpos("bigboxlist", "two", lposOption);

            System.out.println("Command: lpos bigboxlist two maxlen 10 rank -1 | Result: " + lposResult);

            /**
             * Get 2nd occurence from the end and consider 10 items from the end
             *
             * Command: lpos bigboxlist two maxlen 10 rank -2
             * Result: (integer) 7
             */
            lposOption = LPosParams.lPosParams().rank(-2).maxlen(10);
            lposResult = jedis.lpos("bigboxlist", "two", lposOption);

            System.out.println("Command: lpos bigboxlist two maxlen 10 rank -2 | Result: " + lposResult);

            /**
             * Get 1st occurence of "three" from the end and consider 10 items from the end
             * Three does not exist in last 10 items, so we get (nil)
             *
             * Command: lpos bigboxlist three maxlen 10 rank -1
             * Result: (nil)
             */
            lposOption = LPosParams.lPosParams().rank(-1).maxlen(10);
            lposResult = jedis.lpos("bigboxlist", "three", lposOption);

            System.out.println("Command: lpos bigboxlist three maxlen 10 rank -1 | Result: " + lposResult);

            /**
             * Try to get a non existing element from a list
             * We get (nil) value
             *
             * Command: lpos bigboxlist nonexistingitem
             * Result: (nil)
             */
            lposResult = jedis.lpos("bigboxlist", "nonexistingitem");

            System.out.println("Command: lpos bigboxlist nonexistingitem | Result: " + lposResult);

            /**
             * Set a string value
             *
             * Command: set mystr "my string value here"
             * Result: OK
             */
            String setResult = jedis.set("mystr", "my string value here");

            System.out.println("Command: set mystr \"my string value here\" | Result: " + setResult);

            /**
             * Try to use LPOS command on a string
             * We get an error for the wrong type of operation
             *
             * Command: lpos mystr m
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lposResult = jedis.lpos("mystr", "m");

                System.out.println("Command: lpos mystr m | Result: " + lposResult);
            } catch(Exception e) {
                System.out.println("Command: lpos mystr m | Error: " + e.getMessage());
            }

            /**
             * Error returned if COUNT is negative
             *
             * Command: lpos bigboxlist one count -3
             * Result: (error) ERR COUNT can't be negative
             */
            try {
                lposResults = jedis.lpos("bigboxlist", "one", LPosParams.lPosParams(), -3);

                System.out.println("Command: lpos bigboxlist one count -3 | Result: " + lposResults);
            } catch(Exception e) {
                System.out.println("Command: lpos bigboxlist one count -3 | Error: " + e.getMessage());
            }

            /**
             * Error returned if MAXLEN is negative
             *
             * Command: lpos bigboxlist one maxlen -3
             * Result: (error) ERR MAXLEN can't be negative
             */
            try {
                lposResult = jedis.lpos("bigboxlist", "one", LPosParams.lPosParams().maxlen(-3));

                System.out.println("Command: lpos bigboxlist one maxlen -3 | Result: " + lposResult);
            } catch(Exception e) {
                System.out.println("Command: lpos bigboxlist one maxlen -3 | Error: " + e.getMessage());
            }

        }

        jedisPool.close();

    }
}
