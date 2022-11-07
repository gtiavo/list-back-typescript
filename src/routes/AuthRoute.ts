import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRoute {

    router:Router;
    authController: AuthController

    constructor(){
       this.router = Router();
       this.authController = new AuthController();
       this.authRoutes();
    }

    authRoutes() {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', this.authController.login );
    }
}