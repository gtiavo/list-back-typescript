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
         this.router.get('/', this.commentController.findAll );
         this.router.get('/:id', this.commentController.findOne );
         this.router.post('/', this.commentController.create );
         this.router.put('/:id', this.commentController.update );
         this.router.delete('/:id', this.commentController.delete );

     }

}