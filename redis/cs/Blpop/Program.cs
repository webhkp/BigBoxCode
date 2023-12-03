// Redis BLPOP command examples in C#

using System;
using System.Collections.Generic;
using StackExchange.Redis;

public class Blpop
{
    public static void Main()
    {
        // Create connection pool
        ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost:6379");
        IDatabase rdb = redis.GetDatabase();

        
    }
}
