import 'reflect-metadata';
import { DataSource } from "typeorm";
import { UserEntity, ListEntity, GuestEntity, CommnentEntity  } from "../entities";


export const AppDataSource = new DataSource({

    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "list-back",
    entities: [UserEntity, ListEntity, GuestEntity, CommnentEntity],
    synchronize: true,
    subscribers: [],
    migrations: [],

});

