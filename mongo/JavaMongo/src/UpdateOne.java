// db.collection.updateOne() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Arrays;

public class UpdateOne {
    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Insert some documents
            Document doc1 = new Document("name", "Izabella Conroy")
                    .append("age", 19)
                    .append("phone", "108-679-2154")
                    .append("address", new Document("street", "11 North Vineyard Drive")
                            .append("city", "Pueblo West")
                            .append("state", "CO")
                            .append("postalCode", "81007"));
            Document doc2 = new Document("name", "Alisa Parker")
                    .append("age", 72)
                    .append("phone", "768-319-1054")
                    .append("address", new Document("street", "8532 Ingalls Circle")
                            .append("city", "Arvada")
                            .append("state", "CO")
                            .append("postalCode", "80003"));
            Document doc3 = new Document("name", "Eloise Weber")
                    .append("age", 29)
                    .append("phone", "618-357-2104")
                    .append("address", new Document("street", "632 Belmar Drive")
                            .append("city", "Edmond")
                            .append("state", "OK")
                            .append("postalCode", "73025"));
            customerCollection.insertMany(Arrays.asList(doc1, doc2, doc3));

            // Check the changed document
            ObjectId objId = (ObjectId) doc1.get("_id");
            Document result = customerCollection.find(new Document("_id", objId)).first();
            System.out.println("Command: db.customer.find(objId) | Result: " + result);

            // Select by id and change name, age, and city
            UpdateResult updateResult = customerCollection.updateOne(
                    new Document("_id", objId),
                    new Document("$set", new Document("name", "My Name Changed 9").append("age", 100).append("address.city", "city88"))
            );
            System.out.println("Command: db.customer.updateOne(......find by id, ......update name, age, city) | Result: " + updateResult);

            // Select by id. Change state. Increase age by 7
            updateResult = customerCollection.updateOne(
                    new Document("_id", objId),
                    new Document("$set", new Document("address.state", "ABC")).append("$inc", new Document("age", 7))
            );
            System.out.println("Command: db.customer.updateOne(......find by id, ......update state, age) | Result: " + updateResult);

            // Filter by name. Change age
            updateResult = customerCollection.updateOne(
                    new Document("name", "Alisa Parker"),
                    new Document("$set", new Document("age", 10))
            );
            System.out.println("Command: db.customer.updateOne(......find by name, ......update age) | Result: " + updateResult);

            // Filter by non-existing name. Try to change age
            updateResult = customerCollection.updateOne(
                    new Document("name", "Non Existing Name"),
                    new Document("$set", new Document("age", 100))
            );
            System.out.println("Command: db.customer.updateOne(......find by non existing name, ......update age) | Result: " + updateResult);

            // Filter by non-existing name. Update age. Provide upsert=true. New document created
            updateResult = customerCollection.updateOne(
                    new Document("name", "Non Existing Name"),
                    new Document("$set", new Document("age", 100)),
                    new com.mongodb.client.model.UpdateOptions().upsert(true)
            );
            System.out.println("Command: db.customer.updateOne(......find by non existing name, ......update age, .....provide upsert option) | Result: " + updateResult);

            // Check upserted document
            result = customerCollection.find(new Document("name", "Non Existing Name")).first();
            System.out.println("Command: db.customer.find({ \"name\":  \"Non Existing Name\" }) | Result: " + result);

            // Close the connection
            mongoClient.close();
        }
    }
}
