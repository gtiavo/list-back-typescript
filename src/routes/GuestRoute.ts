import { Router } from 'express';
import passport from 'passport';
import { GuestController } from '../controllers';
import { isUserOk } from '../middlewares';

export class GuestRoute {

    router:Router;
    guestController: GuestController;

    constructor(){
        this.router = Router();
        this.guestController = new GuestController();
        this.userRoutes();
     }
 
     userRoutes() {

         this.router.use(passport.authenticate('jwt', {session: false}));
         this.router.get('/', this.guestController.findGuestUserRelations );
         this.router.post('/:idUserParams', this.guestController.create );
         this.router.delete('/:idUserParams', this.guestController.deleteUserRelations );
         this.router.delete('/relationship/:idUserParams', this.guestController.deleteGuestUserRelations );

     }


}