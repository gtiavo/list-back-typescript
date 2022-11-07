import { Router } from 'express';
import { AuthRoute } from './AuthRoute';
import { ListRoute } from './ListRoute';

export class PathRoutes {

    router:Router;
    authPath:Router;
    listPath:Router;

    constructor(){
        this.router = Router();
        this.authPath = new AuthRoute().router;
        this.listPath = new ListRoute().router;
        this.paths();
    }

    paths() {
        this.router.use('/auth', this.authPath);
        this.router.use('/tolist', this.listPath);
    }
}


