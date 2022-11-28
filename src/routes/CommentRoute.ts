import { Router } from "express";
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

         this.router.get('/', this.commentController.findAll );
         this.router.post('/', this.commentController.create );

     }

}