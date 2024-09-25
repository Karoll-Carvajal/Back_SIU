import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Roles } from 'src/models/roles/roles';

@Controller('/role')
export class RoleController {
    constructor(private readonly serviceRole: RoleService) {

    }

    @Get("/all")
    public getRole(): any {
        return this.serviceRole.consult();
    }
    @Post("/add")
    public RoleRegister(@Body() objRol : Roles): any{
        return this.serviceRole.register(objRol);
    }

    @Get("/one/:codRole") /* codRole debe ser el nombre directo del atributo */
    public consultOneRole(@Param() parameter: any ) : any{
        const codeRole:number = Number(parameter.codRole)

        if(!isNaN(codeRole)){
            return this.serviceRole.consulOne(codeRole);
        }else{
            return new HttpException("El codigo del rol no existe", HttpStatus.NOT_ACCEPTABLE)
        }
    }
    
    @Put("/update")
    public updateRole (@Body() objUpdate: Roles): any{
        return this.serviceRole.update(objUpdate,objUpdate.codRole);
    }

    @Put("/update/:codRole")
    public updateRoleForParameter(@Body() objUpdate: Roles, @Param() parameter: any):any{
        const code : number=Number(parameter.codRole);
        if (!isNaN(code)) {
            return this.serviceRole.update(objUpdate, code)
        }else{
            return new HttpException("Codigo de rol no valido", HttpStatus.NOT_ACCEPTABLE)
        }
    }

        @Delete("/delete/:codRole")
        public delete (@Body() objDelete : Roles, @Param() parameter:any) : any{
            const code : number=Number(parameter.codRole);
            if (!isNaN(code)) {
                return this.serviceRole.delete(objDelete, code);
            }else{
                return new HttpException("Codigo de rol no valido", HttpStatus.BAD_REQUEST)
            }
        }
}
