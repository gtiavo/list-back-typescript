import { Router } from "express";
import passport from 'passport';
import { CommentController } from '../controllers';

export class CommentRoute {

    router:Router;
    commentController: CommentController;

    constructor(){
        this.router = Router();
        this.commentController = new CommentController();
        this.commentRoutes();
     }
 
     commentRoutes() {

         this.router.use(passport.authenticate('jwt', {session: false}));
         this.router.get('/one-list/:idListParams', this.commentController.findAll );
         this.router.get('/:id', this.commentController.findOne );
         this.router.post('/:idListParams', this.commentController.create );
         this.router.put('/:id', this.commentController.update );
         this.router.delete('/:id', this.commentController.delete );

     }

}