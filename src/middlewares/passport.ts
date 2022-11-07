import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { UserEntity } from '../entities';
import { AppDataSource } from '../database/data-source';
import { keyPassport } from '../config/key-passport';
import { Repository } from 'typeorm';


export class Passport {

    private readonly authRepository: Repository<UserEntity> =  AppDataSource.getRepository(UserEntity);
    private opts:StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRETKEYJWT || keyPassport
    }

    strategy() {
       return new Strategy(this.opts, async( payload, done) => {
            const user = await this.authRepository.findOne({where:{ id: payload.id }, select:{fullName:true, email:true, id:true}});
            if(user) {
                return done(null, user);
            }
            
          return done(null, false);
        })
    }
}