import { sign } from 'jsonwebtoken';
import { Body, Controller, Post } from '@nestjs/common';
import { AccessService } from './access.service';
import { Access } from 'src/models/access/access';

@Controller('access')
export class AccessController {

    constructor ( private readonly serviceAccess : AccessService){

    }

    @Post("/signin")
    public login(@Body()  objAccess: Access) : any{
        return this.serviceAccess.session(objAccess);
    }
}
