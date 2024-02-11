// db.collection.insertOne() method example in Java

import com.mongodb.client.*;
import org.bson.Document;

public class InsertOne {

    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Insert one document
            Document document1 = new Document("name", "john doe")
                    .append("age", 34);
            customerCollection.insertOne(document1);
            System.out.println("Command: db.customer.insertOne({name: \"john doe\", age: 34}) | Result: " + document1);

            // Insert document with _id defined
            Document document2 = new Document("_id", 99)
                    .append("name", "Leatha Ledner")
                    .append("age", 54);
            customerCollection.insertOne(document2);
            System.out.println("Command: db.customer.insertOne({_id: 99, name: \"Leatha Ledner\", age: 54}) | Result: " + document2);

            // Try to add a document with an existing _id
            // We get an error
            try {
                Document document3 = new Document("_id", 99)
                        .append("name", "Sophia Gray")
                        .append("age", 25);
                customerCollection.insertOne(document3);
                System.out.println("Command: db.customer.insertOne({_id: 99, name: \"Sophia Gray\", age: 25}) | Result: " + document3);
            } catch (Exception e) {
                System.out.println("Command: db.customer.insertOne({_id: 99, name: \"Sophia Gray\", age: 25}) | Error: " + e);
            }

            // Provide writeConcern to insertOne
            Document document4 = new Document("_id", 100)
                    .append("name", "Sophia Gray")
                    .append("age", 25);
            customerCollection.insertOne(document4);
            System.out.println("Command: db.customer.insertOne({_id: 100, name: \"Sophia Gray\", age: 25}, {writeConcern: {w: \"majority\", wtimeout: 100}}}) | Result: " + document4);

            // Insert nested document
            Document document5 = new Document("name", "Devonte Greenholt")
                    .append("dob", "1976-01-12T06:00:00Z")
                    .append("address", new Document("street", "1114 Edmonton Trail NE")
                            .append("city", "Calgary")
                            .append("state", "Alberta")
                            .append("zip", "T2E 0Z2")
                            .append("phone", "(403) 277-3408")
                            .append("country", "canada"));
            customerCollection.insertOne(document5);
            System.out.println("Command: db.customer.insertOne(name: \"Devonte Greenholt\", dob: ISODate(\"1976-01-12T06:00:00Z\"), address: { street: \"1114 Edmonton Trail NE\", city: \"Calgary\", state: \"Alberta\", zip: \"T2E 0Z2\", phone: \"(403) 277-3408\", country: \"canada\"}) | Result: " + document5);

            // Close connection
            mongoClient.close();
        }
    }
}
