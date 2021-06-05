export declare class Connection {
    static connection: Connection;
    static initializeDB(config: any): Connection;
    static getConnection(): Connection;
}
