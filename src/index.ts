import 'dotenv/config'
import { AppDataSource } from "./data-source"
import {ConnectionManager} from "./classes/ConnectionManager";
import {School} from "./entity/School";

const ws_server_properties = {port: process.env.WS_SERVER_PORT};

AppDataSource.initialize().then(async () => {
    const connectionManager = new ConnectionManager(ws_server_properties);
}).catch(error => console.log(error))


