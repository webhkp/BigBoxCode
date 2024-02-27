// db.collection.updateMany() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.result.InsertManyResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.List;

public class UpdateMany {
    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Insert some documents
            InsertManyResult insertResult = customerCollection.insertMany(List.of(
                    new Document("name", "Izabella Conroy")
                            .append("age", 19)
                            .append("phone", "108-679-2154")
                            .append("address", new Document()
                                    .append("street", "11 North Vineyard Drive")
                                    .append("city", "Minneapolis")
                                    .append("state", "Minnesota")
                                    .append("postalCode", "19426")
                                    .append("country", "US"))
                            .append("profileCompletenessScore", 30),
                    new Document("name", "Lambert Purdy")
                            .append("age", 28)
                            .append("phone", "(610) 489-3633")
                            .append("address", new Document()
                                    .append("street", "305 2nd Ave")
                                    .append("city", "Collegeville")
                                    .append("state", "Minnesota")
                                    .append("postalCode", "81007")
                                    .append("country", "US"))
                            .append("profileCompletenessScore", 40),
                    new Document("name", "Alisa Parker")
                            .append("age", 72)
                            .append("phone", "768-319-1054")
                            .append("address", new Document()
                                    .append("street", "8532 Ingalls Circle")
                                    .append("city", "Arvada")
                                    .append("state", "CO")
                                    .append("postalCode", "80003")
                                    .append("country", "CA"))
                            .append("profileCompletenessScore", 60),
                    new Document("name", "Eloise Weber")
                            .append("age", 29)
                            .append("phone", "618-357-2104")
                            .append("address", new Document()
                                    .append("street", "632 Belmar Drive")
                                    .append("city", "Edmond")
                                    .append("state", "OK")
                                    .append("postalCode", "73025")
                                    .append("country", "CA"))
                            .append("profileCompletenessScore", 80)
            ));

            System.out.println("Command: db.customer.insertMany(... 3 documents ) | Result: " + insertResult);

            // Update based on country and state
            UpdateResult updateResult = customerCollection.updateMany(
                    new Document("address.country", "US").append("address.state", "Minnesota"),
                    new Document("$set", new Document()
                            .append("phone", "(310) 794-7217")
                            .append("latitude", 34.061106)
                            .append("longitude", -118.447428))
            );

            System.out.println("Command: db.customer.updateMany(......find by country and state, ......update phone and set lat, lng) | Result:" + updateResult);

            // Increase profileCompletenessScore where age and location exist
            updateResult = customerCollection.updateMany(
                    new Document("age", new Document("$exists", true)).append("latitude", new Document("$exists", true)),
                    new Document("$inc", new Document("profileCompletenessScore", 20))
            );

            System.out.println("Command: db.customer.updateMany(......find by age and latitude, ......increase profile completeness) | Result:" + updateResult);

            // Try to update based on name (non-existing name)
            updateResult = customerCollection.updateMany(
                    new Document("name", "non existing name"),
                    new Document("$set", new Document("address.state", "NY").append("inc", new Document("profileCompletenessScore", 20)))
            );

            System.out.println("Command: db.customer.updateOne(......find by name, ......update  state and score) | Result:" + updateResult);

            // Upsert a document with the specified name
            updateResult = customerCollection.updateMany(
                    new Document("name", "non existing name"),
                    new Document("$set", new Document("address.state", "NY").append("inc", new Document("profileCompletenessScore", 20))),
                    new com.mongodb.client.model.UpdateOptions().upsert(true)
            );

            System.out.println("Command: db.customer.updateOne(......find by name, ......update state and score, provide upsert option) | Result:" + updateResult);

            mongoClient.close();

        }
    }
}
