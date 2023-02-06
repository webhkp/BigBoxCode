class DbConnSingleton {
    private static singletonInstance: DbConnSingleton;
    private host: string;
    private port: number;
    private username: string;
    private password: string;

    private constructor(host: string, port: number, username: string, password: string) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;

    }

    public static getInstance(host: string, port: number, username: string, password: string): DbConnSingleton {
        if (this.singletonInstance) {
            console.log('Using existing db connection instance');
            return this.singletonInstance;
        }

        console.log('Creating new db connection instance');
        this.singletonInstance = new DbConnSingleton(host, port, username, password);

        return this.singletonInstance;
    }

    public printConnectionDetails() {
        console.log("host:" + this.host);
        console.log("port:" + this.port);
        console.log("username:" + this.username);
        console.log("password:" + this.password);
    }
    public executeQuery(query: string) {
        console.log("Executing query: " + query);
    }

}

const dbConnOne = DbConnSingleton.getInstance('loclahost', 1234, 'root', 'secret!pass');

console.log("DB connection details for dbConnOne:");
dbConnOne.printConnectionDetails();

const dbConnTwo = DbConnSingleton.getInstance('192.168.55.55', 2222, 'root2', 'secret!pass2');

console.log("DB connection details for dbConnTwo:");
dbConnTwo.printConnectionDetails();