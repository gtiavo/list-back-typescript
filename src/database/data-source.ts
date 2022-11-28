import 'reflect-metadata';
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { ListEntity } from '../entities/ListEntity';
import { GuestEntity } from '../entities/GuestEntity';

export const AppDataSource = new DataSource({

    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "list-back",
    entities: [UserEntity, ListEntity, GuestEntity],
    synchronize: true,
    subscribers: [],
    migrations: [],

});

