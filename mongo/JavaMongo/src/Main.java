import com.mongodb.client.result.InsertOneResult;
import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.HashMap;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class Main {
    public static void main(String[] args) {

        // Replace the placeholder with your MongoDB deployment's connection string
        String uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigboxcode");
            MongoCollection<Document> testCollection = database.getCollection("mytest");

            // Insert a document
            Map<String, String> documentData = new HashMap<>() {{
                put("siteName", "BigBoxCode");
                put("siteURL", "https://bigboxcode.com");
                put("status", "active");
                put("whois", "whois.bigboxcode.com");
            }};
            Document insertDocument = new Document(documentData);
            InsertOneResult insertResult = testCollection.insertOne(insertDocument);

            System.out.println("Insert Result: " + insertResult);

            // Find the result
            Document findResult = testCollection.find(eq("_id", insertResult.getInsertedId())).first();
            if (findResult != null) {
                System.out.println("Find Result: " + findResult.toJson());
            } else {
                System.out.println("Not found.");
            }
        }
    }
}