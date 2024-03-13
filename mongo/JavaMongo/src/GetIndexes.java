// db.collection.getIndexes() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.model.IndexOptions;
import org.bson.Document;

public class GetIndexes {
    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Create unique index on email field
            String createIndexResult = customerCollection.createIndex(new Document("email", 1), new IndexOptions().unique(true));

            System.out.println("Command: db.customer.createIndex({email: 1}, {unique: true}) | Result: " + createIndexResult);

            // Set index with name
            createIndexResult = customerCollection.createIndex(new Document("name", 1), new IndexOptions().name("my_name_idx"));

            System.out.println("Command: db.customer.createIndex({name: 1}, {name: \"my_name_idx\"}) | Result: " + createIndexResult);

            // Set compound index on address fields with hashed zipcode
            createIndexResult = customerCollection.createIndex(
                    new Document("address.country", 1)
                            .append("address.state", 1)
                            .append("address.zipcode", "hashed")
            );

            System.out.println("Command: db.customer.createIndex({\"address.country\": 1, \"address.state\" : 1, \"address.zipcode\" : \"hashed\"}) | Result: " + createIndexResult);

            // Set hidden index
            createIndexResult = customerCollection.createIndex(new Document("profileCompletenessScore", 1), new IndexOptions().hidden(true));

            System.out.println("Command: db.customer.createIndex({profileCompletenessScore: 1}, {hidden: true}) | Result: " + createIndexResult);

            // Check indexes
            System.out.println("Indexes:");
            for (Document index : customerCollection.listIndexes()) {
                System.out.println(index.toJson());
            }
            mongoClient.close();

        }
    }
}
