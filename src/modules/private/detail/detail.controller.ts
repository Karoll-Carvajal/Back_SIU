import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DetailService } from './detail.service';
import { Detail } from 'src/models/detail/detail';

@Controller('/details')
export class DetailController {
    constructor(private readonly serviceDetail: DetailService) {

    }

    @Get("/all")
    public getDetail(): any {
        return this.serviceDetail.consult();
    }
    @Post("/add")
    public RoleRegister(@Body() objDetail: Detail): any {
        return this.serviceDetail.register(objDetail);
    }

    @Get("/one/:codDetail") 
    public consultOneRole(@Param() parameter: any): any {
        const codeDetail: number = Number(parameter.codDetail)

        if (!isNaN(codeDetail)) {
            return this.serviceDetail.consulOne(codeDetail);
        } else {
            return new HttpException("El codigo del detalle no existe", HttpStatus.NOT_ACCEPTABLE)
        }
    }

    @Put("/update")
    public updateRole(@Body() objUpdate: Detail): any {
        return this.serviceDetail.update(objUpdate, objUpdate.codDetail);
    }

    @Put("/update/:codDetail")
    public updateRoleForParameter(@Body() objUpdate: Detail, @Param() parameter: any): any {
        const code: number = Number(parameter.codDetail);
        if (!isNaN(code)) {
            return this.serviceDetail.update(objUpdate, code)
        } else {
            return new HttpException("Codigo del detalle no valido", HttpStatus.NOT_ACCEPTABLE)
        }
    }

    @Delete("/delete/:codDetail")
    public delete(@Body() objDelete: Detail, @Param() parameter: any): any {
        const code: number = Number(parameter.codDetail);
        if (!isNaN(code)) {
            return this.serviceDetail.delete(objDelete, code);
        } else {
            return new HttpException("Codigo del detalle no valido", HttpStatus.BAD_REQUEST)
        }
    }
}
