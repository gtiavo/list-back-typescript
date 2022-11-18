import { Router } from 'express';
import passport from 'passport';
import { UserController } from '../controllers';
import { isUserOk } from '../middlewares';

export class UserRoute {

    router:Router;
    userController: UserController;

    constructor(){
        this.router = Router();
        this.userController = new UserController();
        this.userRoutes();
     }
 
     userRoutes() {

         this.router.use(passport.authenticate('jwt', {session: false}));
         this.router.get('/', this.userController.findAll );
         this.router.get('/:idUserParams', this.userController.findOne  );
         this.router.put('/:idUserParams',isUserOk, this.userController.update );
         this.router.delete('/:idUserParams',isUserOk, this.userController.delete  );

     }


}