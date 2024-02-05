// db.collection.findOne() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

public class FindOne {

    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");
            MongoCollection<Document> wrongCollection = database.getCollection("wrong_collection");

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


            // Find one document from cutomer collection
            Document findOneResult = customerCollection.find().first();

            System.out.println("Command: db.customer.findOne() | Result: " + findOneResult.toString());

            // Apply fitler where age=29
            findOneResult = customerCollection.find(Filters.eq("age", 29)).first();

            System.out.println(
                    "Command: db.customer.findOne({age: 29}) | Result: " + findOneResult.toString());

            // Apply filter where age >= 29
            findOneResult = customerCollection.find(Filters.gte("age", 29)).first();

            System.out.println(
                    "Command: db.customer.findOne({age: {$gte: 29}}) | Result: " + findOneResult.toString());

            // Use $or operator for the query filter
            findOneResult = customerCollection.find(Filters.or(Filters.gt("age", 29), Filters.eq("address.postalCode", "81007"))).first();

            System.out.println(
                    "Command: db.customer.findOne({$or: [{age: {$gt: 29}}, {\"address.postalCode\": \"81007\"}]}) | Result: " + findOneResult.toString());

            // Set projection to get name, phone, and postalCode only
            findOneResult = customerCollection.find(Filters.eq("age", 29)).projection(new Document("name", 1).append("phone", true).append("address.postalCode", 1)).first();

            System.out.println("Command: db.customer.findOne({age: 29}, { name: 1, phone: true, \"address.postalCode\": 1}) | Result: " + findOneResult.toString());

            // Ignore properties
            findOneResult = customerCollection.find().projection(new Document("name", false).append("phone", 0).append("address.city", 0)).first();

            System.out.println("Command: db.customer.findOne({}, { name: false, phone: 0, \"address.city\": 0}) | Result:" + findOneResult.toString());

            // Apply filter that doesn't return any result
            findOneResult = customerCollection.find(Filters.eq("age", 299999999)).first();

            System.out.println("Command: db.customer.findOne({age: 299999999}) | Result: " + findOneResult);

            // Use regex to filter by matching value of a field
            Pattern pattern = Pattern.compile("^alisa", Pattern.CASE_INSENSITIVE);
            findOneResult = customerCollection.find(Filters.regex("name", pattern)).first();

            System.out.println(
                    "Command: db.customer.findOne({name: {$regex : /^alisa/i}}) | Result: " + findOneResult.toString());

            // Use regex
            pattern = Pattern.compile("drive", Pattern.CASE_INSENSITIVE);
            findOneResult = customerCollection.find(Filters.regex("address.street", pattern)).first();

            System.out.println("Command: db.customer.findOne({\"address.street\": {$regex : /drive/i}}) | Result: " + findOneResult.toString());

            // Try to use findOne() one a non existing collection, We get null
            findOneResult = wrongCollection.find().first();

            System.out.println("Command: db.wrong_collection.findOne() | Result: " + findOneResult);

        }
    }
}
