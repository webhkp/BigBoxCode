// db.collection.insertMany() method example in Java

import com.mongodb.client.*;
import com.mongodb.client.model.InsertManyOptions;
import com.mongodb.client.result.InsertManyResult;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class InsertMany {
    public static void main(String[] args) {
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> customerCollection = database.getCollection("customer");

            // Insert some documents
            List<Document> documents = new ArrayList<>();
            documents.add(new Document("name", "Izabella Conroy")
                    .append("age", 19)
                    .append("phone", "108-679-2154")
                    .append("address", new Document("street", "11 North Vineyard Drive")
                            .append("city", "Pueblo West")
                            .append("state", "CO")
                            .append("postalCode", "81007")));
            documents.add(new Document("name", "Alisa Parker")
                    .append("age", 72)
                    .append("phone", "768-319-1054")
                    .append("address", new Document("street", "8532 Ingalls Circle")
                            .append("city", "Arvada")
                            .append("state", "CO")
                            .append("postalCode", "80003")));
            documents.add(new Document("name", "Eloise Weber")
                    .append("age", 29)
                    .append("phone", "618-357-2104")
                    .append("address", new Document("street", "632 Belmar Drive")
                            .append("city", "Edmond")
                            .append("state", "OK")
                            .append("postalCode", "73025")));

            InsertManyResult result = customerCollection.insertMany(documents);
            System.out.println("Command: db.customer.insertMany(... 3 documents ) | Result: " + result);

            // Insert documents with _id, the provided ids will be used
            documents.clear();
            documents.add(new Document("_id", 101)
                    .append("name", "Laurianne Feil")
                    .append("age", 34)
                    .append("phone", "(519) 971-2871")
                    .append("address", new Document("street", "1885 Moro Dr")
                            .append("city", "Windsor")
                            .append("state", "Ontario")
                            .append("postalCode", "N9A 6J3")
                            .append("country", "Canada")));
            documents.add(new Document("_id", 102)
                    .append("name", "Eleanore Padberg")
                    .append("age", 35)
                    .append("phone", "(709) 834-4002")
                    .append("address", new Document("street", "834 Conception Bay Hwy")
                            .append("city", "Conception Bay South")
                            .append("state", "Newfoundland and Labrador")
                            .append("postalCode", "A1X 7T4")
                            .append("country", "Canada")));

            result = customerCollection.insertMany(documents);
            System.out.println("Command: db.customer.insertMany(... 2 documents with _id) | Result: " + result);

            // Use existing _id while inserting a document
            // The insertion will fail, and the method returns an error
            documents.clear();
            documents.add(new Document("name", "Sage Batz").append("age", 20));
            documents.add(new Document("_id", 102).append("name", "Maureen Koepp").append("age", 55));

            try {
                result = customerCollection.insertMany(documents);
                System.out.println("Command: db.customer.insertMany(... one with existing _id) | Result: " + result);
            } catch (Exception e) {
                System.out.println("Command: db.customer.insertMany(... one with existing _id) | Error: " + e.getMessage());
            }

            // If we use an existing _id, then the document insertion fails
            // Also the documents after that are not inserted
            documents.clear();
            documents.add(new Document("name", "Lauretta Schultz").append("age", 20));
            documents.add(new Document("_id", 102).append("name", "Samantha Crona").append("age", 55));
            documents.add(new Document("_id", 110).append("name", "Theo White").append("age", 55));

            try {
                result = customerCollection.insertMany(documents);
                System.out.println("Command: db.customer.insertMany(... one with existing id) | Result: " + result);
            } catch (Exception e) {
                System.out.println("Command: db.customer.insertMany(... one with existing id) | Error: " + e.getMessage());
            }

            // Use existing _id, with ordered=false
            // The document with existing id failed
            // But other documents are inserted
            documents.clear();
            documents.add(new Document("name", "Mavis Schmitt").append("age", 20));
            documents.add(new Document("_id", 102).append("name", "Reva Gutkowski").append("age", 55));
            documents.add(new Document("_id", 110).append("name", "Braulio Schmidt").append("age", 55));
            documents.add(new Document("name", "Ressie Lynch").append("age", 22));

            InsertManyOptions options = new InsertManyOptions().ordered(false);
            try {
                result = customerCollection.insertMany(documents, options);
                System.out.println("Command: db.customer.insertMany(... 4 documents 1 has existing id, {ordered: false}) | Result: " + result);
            } catch (Exception e) {
                System.out.println("Command: db.customer.insertMany(... 4 documents 1 has existing id, {ordered: false}) | Error: " + e.getMessage());
            }

            // Close connection
            mongoClient.close();
        }

    }
}
