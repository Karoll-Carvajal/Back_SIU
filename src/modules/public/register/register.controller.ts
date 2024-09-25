import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

import { User } from 'src/models/user/user';
import { Access } from 'src/models/access/access';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService){

    }

    @Post("/user")
    public addUser(@Body() dataRegister : any): any{
         const objAccess : Access = dataRegister;
         const objUser : User = dataRegister;

         return this.registerService.newUser(objAccess, objUser);
    }
}
