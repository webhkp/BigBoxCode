// Redis HINCRBY command examples in C#

using StackExchange.Redis;

namespace HIncrBy
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");
            IDatabase rdb = redis.GetDatabase();

            /**
             * Set hash fields
             *
             * Command:  hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1
             * Result: (integer) 4
             */
            HashEntry[] hashData = new HashEntry[] {
                new HashEntry("name", "Kenneth Braun"),
                new HashEntry("gender", "male"),
                new HashEntry("state", "California"),
                new HashEntry("age", "42"),
                new HashEntry("order_count", "1"),
            };
            rdb.HashSet("customer:100", hashData);

            Console.WriteLine("Command: hset customer:100 name \"Kenneth Braun\" gender male age 42 order_count 1");

            /**
             * Check hash fields
             *
             * Command:  hgetall customer:100
             * Result:
             *      1) "name"
             *      2) "Kenneth Braun"
             *      3) "gender"
             *      4) "male"
             *      5) "age"
             *      6) "42"
             *      7) "order_count"
             *      8) "1"
             */
            HashEntry[] hgetAllResult = rdb.HashGetAll("customer:100");

            Console.WriteLine("Command: hgetall customer:100 | Result: ", String.Join(",", hgetAllResult));

            /**
             * Increament order_count field by 2
             *
             * Command:  hincrby customer:100 order_count 2
             * Result: (integer) 3
             */
            long hincrbyResult = rdb.HashIncrement("customer:100", "order_count", 2);

            Console.WriteLine("Command: hincrby customer:100 order_count 2 | Result: " + hincrbyResult);

            /**
             * Check the order_count field
             *
             * Command:  hget customer:100 order_count
             * Result: "3"
             */
            RedisValue hgetResult = rdb.HashGet("customer:100", "order_count");

            Console.WriteLine("Command: hget customer:100 order_count | Result: " + hgetResult);

            /**
             * bigboxhash does not exist
             Check field of a non existing hash
             *
             * Command:  hget bigboxhash firstfield
             * Result: (nil)
             */
            hgetResult = rdb.HashGet("bigboxhash", "firstfield");

            Console.WriteLine("Command: hget bigboxhash firstfield | Result: " + hgetResult);

            /**
             * Try to apply HINCRBY on a hash that does not exist
             *
             * Command:   hincrby bigboxhash firstfield 100
             * Result: (integer) 100
             */
            hincrbyResult = rdb.HashIncrement("bigboxhash", "firstfield", 100);

            Console.WriteLine("Command: hincrby bigboxhash firstfield 100 | Result: " + hincrbyResult);

            /**
             * Increament firstfield of bigboxhash
             * We see the increased value
             *
             * Command:  hget bigboxhash firstfield
             * Result: "100"
             */
            hgetResult = rdb.HashGet("bigboxhash", "firstfield");

            Console.WriteLine("Command: hget bigboxhash firstfield | Result: " + hgetResult);

            /**
             * Check a non existing field, of a hash that exists
             *
             * Command:  hget bigboxhash secondfield
             * Result: (nil)
             */
            hgetResult = rdb.HashGet("bigboxhash", "secondfield");

            Console.WriteLine("Command: hget bigboxhash secondfield | Result: " + hgetResult);

            /**
             * Implement HINCRBY on a non existing field
             *
             * Command:   hincrby bigboxhash secondfield 5
             * Result: (integer) 5
             */
            hincrbyResult = rdb.HashIncrement("bigboxhash", "secondfield", 5);

            Console.WriteLine("Command: hincrby bigboxhash secondfield 5 | Result: " + hincrbyResult);

            /**
             * Check the secondfield
             *
             * Command:  hget bigboxhash secondfield
             * Result: "5"
             */
            hgetResult = rdb.HashGet("bigboxhash", "secondfield");

            Console.WriteLine("Command: hget bigboxhash secondfield | Result: " + hgetResult);

            /**
             * Use a negative value with HINCRBY
             * That will decrease the existing value
             *
             * Command:   hincrby bigboxhash secondfield -3
             * Result: (integer) 2
             */
            hincrbyResult = rdb.HashIncrement("bigboxhash", "secondfield", -3);

            Console.WriteLine("Command: hincrby bigboxhash secondfield -3 | Result: " + hincrbyResult);

            /**
             * Check secondfield value
             *
             * Command:  hget bigboxhash secondfield
             * Result: "2"
             */
            hgetResult = rdb.HashGet("bigboxhash", "secondfield");

            Console.WriteLine("Command: hget bigboxhash secondfield | Result: " + hgetResult);

            /**
             * Decreament of the hash field by -5
             *
             * Command:   hincrby bigboxhash secondfield -5
             * Result: (integer) -3
             */
            hincrbyResult = rdb.HashIncrement("bigboxhash", "secondfield", -5);

            Console.WriteLine("Command: hincrby bigboxhash secondfield -5 | Result: " + hincrbyResult);

            /**
             * Check the secondfield value
             *
             * Command:  hget bigboxhash secondfield
             * Result: "-3"
             */
            hgetResult = rdb.HashGet("bigboxhash", "secondfield");

            Console.WriteLine("Command: hget bigboxhash secondfield | Result: " + hgetResult);

            /**
             * Set a string key
             *
             * Command:  set bigboxstr "some str value here"
             * Result: OK
             */
            bool setResult = rdb.StringSet("bigboxstr", "some str value here");

            Console.WriteLine("Command: set bigboxstr \"some str value here\" | Result: " + setResult);

            /**
             * Try to use HINCRBY on the string
             * We get an error as command is applied to a wrong data type
             *
             * Command:   hincrby bigboxstr field1 10
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try
            {
                hincrbyResult = rdb.HashIncrement("bigboxstr", "field1", 10);

                Console.WriteLine("Command: hincrby bigboxstr field1 10 | Result: " + hincrbyResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hincrby bigboxstr field1 10 | Error: " + e.Message);
            }

            /**
             * Check cutsomer name
             *
             * Command:  hget customer:100 name
             * Result: "Kenneth Braun"
             */
            hgetResult = rdb.HashGet("customer:100", "name");

            Console.WriteLine("Command: hget customer:100 name | Result: " + hgetResult);

            /**
             * Try to apply HINCRBY on the name field
             * We get an error, as the field has string value
             *
             * Command:   hincrby customer:100 name 10
             * Result: (error) ERR hash value is not an integer
             */
            try
            {
                hincrbyResult = rdb.HashIncrement("customer:100", "name", 10);

                Console.WriteLine("Command: hincrby customer:100 name 10 | Result: " + hincrbyResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hincrby customer:100 name 10 | Error: " + e.Message);
            }

            /**
             * Set a filed of a hash to a larg integer value
             *
             * Command:  hset bigboxhash max_test_field 9223372036854775806
             * Result: (integer) 1
             */
            bool hsetResult = rdb.HashSet("bigboxhash", "max_test_field", "9223372036854775806");

            Console.WriteLine("Command: hset bigboxhash max_test_field 9223372036854775806 | Result: " + hsetResult);

            /**
             * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
             * So if we try to increment max_test_field by 10 then it excedes the max integer limit
             * We get an error related to max value overflow
             *
             * Command:  hincrby bigboxhash max_test_field 10
             * Result: (error) ERR increment or decrement would overflow
             */
            try
            {
                hincrbyResult = rdb.HashIncrement("bigboxhash", "max_test_field", 10);

                Console.WriteLine("Command: hincrby bigboxhash max_test_field 10 | Result: " + hincrbyResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hincrby bigboxhash max_test_field 10 | Error: " + e.Message);
            }

            /**
             * Set field value of a has to large negative nubmer
             *
             * Command:  hset bigboxhash max_test_field -9223372036854775709
             * Result: (integer) 0
             */
            hsetResult = rdb.HashSet("bigboxhash", "max_test_field", "-9223372036854775709");

            Console.WriteLine("Command: hset bigboxhash max_test_field -9223372036854775709 | Result: " + hsetResult);

            /**
             * Check the value, we se the negative value is set
             * as it is withing the limit of 64-bit signed integer
             *
             * Command:  hget bigboxhash max_test_field
             * Result: "-9223372036854775709"
             */
            hgetResult = rdb.HashGet("bigboxhash", "max_test_field");

            Console.WriteLine("Command: hget bigboxhash max_test_field | Result: " + hgetResult);

            /**
             * Min value allowed as 64-bit int is -9,223,372,036,854,775,808
             * Try to decrease the value by 10
             * We get an error as the target value goes beyond the minimum integer value
             *
             * Command:  hincrby bigboxhash max_test_field -100
             * Result: (error) ERR increment or decrement would overflow
             */
            try
            {
                hincrbyResult = rdb.HashIncrement("bigboxhash", "max_test_field", -100);

                Console.WriteLine("Command: hincrby bigboxhash max_test_field -100 | Result: " + hincrbyResult);
            }
            catch (Exception e)
            {
                Console.WriteLine("Command: hincrby bigboxhash max_test_field -100 | Error: " + e.Message);
            }
        }
    }
}