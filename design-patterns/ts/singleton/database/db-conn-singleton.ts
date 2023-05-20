// db-conn-singleton.ts

class DbConnSingleton {
    // Declare a private static property, required for the Singleton implementation
    private static singletonInstance: DbConnSingleton;

    // Some properties for storing some information
    // These properties can be declared as readonly if needed
    private readonly host: string;
    private readonly port: number;
    private readonly username: string;
    private readonly password: string;

    /**
     * Constructor
     * 
     * Make sure to make it private for the Singleton implementation
     */
    private constructor(host: string, port: number, username: string, password: string) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
    }

    /**
     * Make sure to declare the function as "static" for the Singleton implemenation
     */
    static getInstance(host: string, port: number, username: string, password: string): DbConnSingleton {
        // Check if instance is already created or not
        if (!this.singletonInstance) {
            console.log('Creating new db connection instance');

            this.singletonInstance = new DbConnSingleton(host, port, username, password);
        }

        return this.singletonInstance;
    }

    // Dummy utility function
    public printConnectionDetails() {
        console.log("host:" + this.host);
        console.log("port:" + this.port);
        console.log("username:" + this.username);
        console.log("password:" + this.password);
    }
    
    // Dummy utility function
    public executeQuery(query: string) {
        console.log("Executing query: " + query);
    }

}

export default DbConnSingleton;