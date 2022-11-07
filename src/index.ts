import { Server } from "./server/model.server";
import * as dotenv from 'dotenv';
dotenv.config();


const server = new Server();
server.errors();
server.listen();