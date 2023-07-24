import 'dotenv/config'
import { AppDataSource } from "./data-source"
import {ConnectionManager} from "./classes/ConnectionManager";
import {School} from "./entity/School";

const ws_server_properties = {port: process.env.WS_SERVER_PORT};

AppDataSource.initialize().then(async () => {
    const connectionManager = new ConnectionManager(ws_server_properties);
    // const school = new School()
    // school.director_id = 1;
    // school.name = "A";
    // school.auth_secret = "assays";
    // console.log(1)
    // await school.save();
    // console.log(2)
}).catch(error => console.log(error))


