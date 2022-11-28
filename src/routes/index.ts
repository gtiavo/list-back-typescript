import { Router } from 'express';
import { AuthRoute } from './AuthRoute';
import { ListRoute } from './ListRoute';
import { UserRoute } from './UserRoute';
import { GuestRoute } from './GuestRoute';
import { CommentRoute } from './CommentRoute';

export class PathRoutes {

    router:Router;
    authPath:Router;
    listPath:Router;
    userPath:Router;
    guestPath:Router;
    commentPath:Router;

    constructor(){
        this.router = Router();
        this.authPath = new AuthRoute().router;
        this.listPath = new ListRoute().router;
        this.userPath = new UserRoute().router;
        this.guestPath = new GuestRoute().router;
        this.commentPath = new CommentRoute().router;
        this.paths();
    }

    paths() {
        this.router.use('/auth', this.authPath);
        this.router.use('/tolist', this.listPath);
        this.router.use('/users', this.userPath);
        this.router.use('/guest-users', this.guestPath);
        this.router.use('/comments', this.commentPath);
    }
}


