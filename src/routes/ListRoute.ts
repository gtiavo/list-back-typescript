import { Router } from 'express';
import passport from 'passport';
import { ListController } from '../controllers';

export class ListRoute {

    router:Router;
    listController: ListController;
    
    constructor(){
       this.router = Router();
       this.listController = new ListController();
       this.authRoutes();
    }

    authRoutes() {
        this.router.use(passport.authenticate('jwt', {session: false}));
        this.router.post('/', this.listController.create);
        this.router.get('/', this.listController.findAll);
        this.router.get('/guest-user', (req,res) => {res.json({ok:true})} );
        this.router.get('/:termParams', this.listController.findOne);
        this.router.put('/:termParams', this.listController.update);
        this.router.delete('/:termParams', this.listController.delete);
        
    }

}