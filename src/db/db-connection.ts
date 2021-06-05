import { Connection, createConnection } from "typeorm";

let connection: Connection

export async function initializeDB(config: any){
    connection = await createConnection(config)
}

export function getConnection(){
    return connection
}