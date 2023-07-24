
import "reflect-metadata"
import { DataSource } from "typeorm"
import { School } from "./entity/School"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DATABASE || "postgres",
    synchronize: true,
    logging: true,
    entities: [School],
    migrations: [],
    subscribers: [],
})