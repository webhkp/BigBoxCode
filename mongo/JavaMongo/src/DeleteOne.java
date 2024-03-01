// db.collection.deleteOne() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertManyResult;
import org.bson.Document;

import java.util.List;

public class DeleteOne {
    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Insert some documents
            InsertManyResult insertResult = customerCollection.insertMany(
                    List.of(
                            new Document("name", "Izabella Conroy")
                                    .append("age", 19)
                                    .append("phone", "108-679-2154")
                                    .append("address", new Document("street", "11 North Vineyard Drive")
                                            .append("city", "Minneapolis")
                                            .append("state", "Minnesota")
                                            .append("postalCode", "19426")
                                            .append("country", "US"))
                                    .append("profileCompletenessScore", 30),
                            new Document("name", "Lambert Purdy")
                                    .append("age", 28)
                                    .append("phone", "(610) 489-3633")
                                    .append("address", new Document("street", "305 2nd Ave")
                                            .append("city", "Collegeville")
                                            .append("state", "Minnesota")
                                            .append("postalCode", "81007")
                                            .append("country", "US"))
                                    .append("profileCompletenessScore", 40),
                            new Document("name", "Alisa Parker")
                                    .append("age", 72)
                                    .append("phone", "768-319-1054")
                                    .append("address", new Document("street", "8532 Ingalls Circle")
                                            .append("city", "Arvada")
                                            .append("state", "CO")
                                            .append("postalCode", "80003")
                                            .append("country", "CA"))
                                    .append("profileCompletenessScore", 60),
                            new Document("name", "Eloise Weber")
                                    .append("age", 29)
                                    .append("phone", "618-357-2104")
                                    .append("address", new Document("street", "632 Belmar Drive")
                                            .append("city", "Edmond")
                                            .append("state", "OK")
                                            .append("postalCode", "73025")
                                            .append("country", "CA"))
                                    .append("profileCompletenessScore", 80)
                    )
            );

            System.out.println("Command: db.customer.insertMany(... 4 documents ) | Result: " + insertResult);

            // Delete one by id
            Document findFirstDocument = customerCollection.find().first();

            DeleteResult deleteResult = customerCollection.deleteOne(findFirstDocument);
            System.out.println("Command: db.customer.deleteOne(... _id filter) | Result: " + deleteResult);

            // Try to delete document by wrong _id
            deleteResult = customerCollection.deleteOne(new Document("_id", "nonexistingid"));
            System.out.println("Command: db.customer.deleteOne(... _id filter) | Result: " + deleteResult);

            // Delete by country
            deleteResult = customerCollection.deleteOne(new Document("address.country", "CA"));
            System.out.println("Command: db.customer.deleteOne(... country filter) | Result: " + deleteResult);

            // Delete by age
            deleteResult = customerCollection.deleteOne(new Document("age", 29));
            System.out.println("Command: db.customer.deleteOne(... age filter) | Result: " + deleteResult);

            // Delete by multiple filters
            deleteResult = customerCollection.deleteOne(new Document("profileCompletenessScore", new Document("$lte", 50)).append("address.country", "US"));
            System.out.println("Command: db.customer.deleteOne(... profile score and country filter) | Result: " + deleteResult);

            mongoClient.close();

        }
    }
}
