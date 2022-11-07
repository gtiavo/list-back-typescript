import * as bcrypt from 'bcryptjs';
import { AuthCreateDto, AuthLoginDTo } from "../dtos/auth";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../entities/UserEntity";
import { FieldsValidate } from '../helpers/FieldsValidate';
import { BadRequestResponse } from '../_HTTP-response/errors';
import { JwtService } from '../helpers';



export class AuthModel {
   
 private readonly authRepository = AppDataSource.getRepository(UserEntity);

 private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();

 private readonly jwtService: JwtService = new JwtService(); 


async create( {fullName, email, password}:AuthCreateDto ){

   const newUser =  new AuthCreateDto(fullName,email,password);
   await this.fieldsValidate.validateOrReject(newUser);
   
   newUser.password = bcrypt.hashSync(password, 10);
   const  user = await this.authRepository.save(newUser);


   return {id: user.id, fullName: user.fullName, email: user.email};
}

async login({email, password}:AuthLoginDTo) {

   const newUser = new AuthLoginDTo(email, password);
   await this.fieldsValidate.validateOrReject(newUser);

   const user = await this.authRepository.findOne({ 
   where: {email: newUser.email}, 
   select:{email: true, id: true, fullName: true, password: true}
});

   if( !user || !bcrypt.compareSync(password, user.password)) throw new BadRequestResponse('email or password invalid');

   delete user.password;

   const token = await this.jwtService.jwtGenerator(user);
   
   return {user, token};

}


findAll(){
    
}

findOne(){

}

update(){

}

remove(){

}

}