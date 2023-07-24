import WebSocket, {WebSocketServer} from "ws";
import {Connection} from "./Connection";

interface Connections {
    [key: string]: Connection
}
export class ConnectionManager {
    private wsServer : WebSocketServer;
    private connections : Connections  = {};

    newConnection (con : WebSocket){
        const created_connection = new Connection(con);
        this.connections[created_connection.uuid] = created_connection;
        return created_connection.uuid;
    }

    constructor (server_properties) {
        this.wsServer = new WebSocketServer(server_properties);
        this.wsServer.on("connection", connection => {
            const connection_uuid = this.newConnection(connection);
            connection.on("close", ()=>{
                delete this.connections[connection_uuid];
            })
        });
    }

}