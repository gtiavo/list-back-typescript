import express, { Application, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import {Passport} from '../middlewares/passport';
import { PathRoutes } from '../routes';
import { AppDataSource } from '../database/data-source';
import { middlewareError } from '../middlewares';
import { Strategy } from 'passport-jwt';



export class Server {

    app: Application;
    path:string;
    port:string | number | undefined;
    passportMiddleware:Strategy
    
    constructor(){
        this.app = express();

        this.path = '/api';
        this.port = process.env.PORT || 3001;

        this.passportMiddleware = new Passport().strategy()

        this.middleware();
        this.routes();
        this.dbInit();
    }

    dbInit() {
        AppDataSource.initialize()
            .then(() =>{
                console.log("DB Up!")
            })
            .catch((error) => console.log(error));
    }

    middleware(){
        this.app.use(cors());
        this.app.use(morgan('tiny'));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        passport.use(this.passportMiddleware);
    }

    routes(){
        const authRoutes:Router = new PathRoutes().router; 
        this.app.use(this.path, authRoutes);
    }

    errors() {
        this.app.use(middlewareError)
    }

     listen() {
        this.app.listen(this.port, () => console.log(`Port ${this.port} raised!`)); 
    }
}