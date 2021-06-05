import { Connection } from "typeorm";
export declare function initializeDB(config: any): Promise<void>;
export declare function getConnection(): Connection;
