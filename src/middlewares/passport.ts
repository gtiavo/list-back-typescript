import { Repository } from 'typeorm';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { UserEntity } from '../entities';
import { AppDataSource } from '../database/data-source';
import { KEY_PASSPORT } from '../config/key-passport';


export class Passport {

    private readonly authRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);
    private opts:StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRETKEYJWT || KEY_PASSPORT
    }

    strategy() {
       return new Strategy(this.opts, async( payload, done) => {
            const user: UserEntity = await this.authRepository.findOne({where:{ id: payload.id }, select:{fullName:true, email:true, id:true, roles:true, isActive:true, userToken:true }});
            if(!user) {
                return done(null, false);
            }

            if( !user.isActive ) {
                return done(null, false);
            }
            
          return done(null, user);
        })
    }
}