// db.collection.find() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class Find {

    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Insert some documents
            List<Document> documents = Arrays.asList(
                    new Document("name", "Izabella Conroy")
                            .append("age", 19)
                            .append("phone", "108-679-2154")
                            .append("address", new Document("street", "11 North Vineyard Drive")
                                    .append("city", "Pueblo West")
                                    .append("state", "CO")
                                    .append("postalCode", "81007")),
                    new Document("name", "Alisa Parker")
                            .append("age", 72)
                            .append("phone", "768-319-1054")
                            .append("address", new Document("street", "8532 Ingalls Circle")
                                    .append("city", "Arvada")
                                    .append("state", "CO")
                                    .append("postalCode", "80003")),
                    new Document("name", "Eloise Weber")
                            .append("age", 29)
                            .append("phone", "618-357-2104")
                            .append("address", new Document("street", "632 Belmar Drive")
                                    .append("city", "Edmond")
                                    .append("state", "OK")
                                    .append("postalCode", "73025"))
            );

            customerCollection.insertMany(documents);
            System.out.println("Command: db.customer.insertMany() | Result: " + documents);

            // Find all documents from the customer collection
            FindIterable<Document> findResults = customerCollection.find();

            System.out.println("Command: db.customer.find() | Result: ");
            MongoCursor<Document> findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Apply filter where age=29
            findResults = customerCollection.find(Filters.eq("age", 29));

            System.out.println("Command: db.customer.find() | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Apply filter where age >= 29
            findResults = customerCollection.find(Filters.gte("age", 29));

            System.out.println("Command: db.customer.find({age: {$gte: 29}}) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Use $or operator for the query filter
            findResults = customerCollection.find(Filters.or(Filters.gt("age", 29), Filters.eq("address.postalCode", "81007")));

            System.out.println("Command: db.customer.find({$or: [{age: {$gt: 29}}, {\"address.postalCode\": \"81007\"}]}) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Set projection to get name and phone only
            findResults = customerCollection.find()
                    .projection(new Document("name", 1).append("phone", true));

            System.out.println("Command: db.customer.find({}, { name: 1, phone: true}) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Set projection to ignore name and phone fields
            findResults = customerCollection.find()
                    .projection(new Document("name", false).append("phone", 0));

            System.out.println("Command: db.customer.find({}, { name: false, phone: 0}) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Ignore nested property inside address
            findResults = customerCollection.find()
                    .projection(new Document("address.city", 0).append("age", 0).append("address.street", false));

            System.out.println("Command: db.customer.find({}, {\"address.city\": 0, age: 0, \"address.street\": false}) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Sort by age in ascending order
            findResults = customerCollection.find().sort(Sorts.ascending("age"));

            System.out.println("Command: db.customer.find().sort({age: 1}) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Sort by age in descending order
            findResults = customerCollection.find().sort(Sorts.descending("age"));

            System.out.println("Command: db.customer.find().sort({age: -1}) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Apply limit
            findResults = customerCollection.find().sort(Sorts.ascending("age")).limit(2);

            System.out.println("Command: db.customer.find().sort({age: 1}).limit(2) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }

            // Skip certain results
            findResults = customerCollection.find().sort(Sorts.ascending("age")).skip(2).limit(2);

            System.out.println("Command: db.customer.find().sort({age: 1}).skip(2).limit(2) | Result: ");
            findResultCursor = findResults.iterator();
            while (findResultCursor.hasNext()) {
                System.out.println(findResultCursor.next());
            }
        }
    }
}
