// db.collection.createIndex() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.model.IndexOptions;
import org.bson.Document;

public class CreateIndex {
    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Create unique index on email field
            customerCollection.createIndex(new Document("email", 1), new IndexOptions().unique(true));

            // Check indexes
            System.out.println("Indexes:");
            for (Document index : customerCollection.listIndexes()) {
                System.out.println(index.toJson());
            }

            // Set index with name
            customerCollection.createIndex(new Document("name", 1), new IndexOptions().name("my_name_idx"));

            // Check indexes
            System.out.println("Indexes:");
            for (Document index : customerCollection.listIndexes()) {
                System.out.println(index.toJson());
            }

            // Set compound index on address fields with hashed zipcode
            customerCollection.createIndex(
                    new Document("address.country", 1)
                            .append("address.state", 1)
                            .append("address.zipcode", "hashed")
            );

            // Check indexes
            System.out.println("Indexes:");
            for (Document index : customerCollection.listIndexes()) {
                System.out.println(index.toJson());
            }
            mongoClient.close();

        }
    }
}
