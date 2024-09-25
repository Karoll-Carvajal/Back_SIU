import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DetailPlaceService } from './detail_place.service';
import { DetailPlace } from 'src/models/detail-place/detail-place';

@Controller('/detailPlace')
export class DetailPlaceController {
    constructor(private readonly serviceDetailPlace: DetailPlaceService) {

    }

    @Get("/all")
    public getDetail(): any {
        return this.serviceDetailPlace.consult();
    }
    @Post("/add")
    public RoleRegister(@Body() objDetailPlace: DetailPlace): any {
        return this.serviceDetailPlace.register(objDetailPlace);
    }

    @Get("/one/:codDetailPlace") 
    public consultOneRole(@Param() parameter: any): any {
        const codeDetail: number = Number(parameter.codDetailPlace)

        if (!isNaN(codeDetail)) {
            return this.serviceDetailPlace.consultOne(codeDetail);
        } else {
            return new HttpException("El codigo no existe", HttpStatus.NOT_ACCEPTABLE)
        }
    }

    @Put("/update")
    public updateRole(@Body() objUpdate: DetailPlace): any {
        return this.serviceDetailPlace.update(objUpdate, objUpdate.codDetailPlace);
    }

    @Put("/update/:codDetailPlace")
    public updateRoleForParameter(@Body() objUpdate: DetailPlace, @Param() parameter: any): any {
        const code: number = Number(parameter.codDetailPlace);
        if (!isNaN(code)) {
            return this.serviceDetailPlace.update(objUpdate, code)
        } else {
            return new HttpException("Codigo no valido", HttpStatus.NOT_ACCEPTABLE)
        }
    }

    @Delete("/delete/:codDetailPlace")
    public delete( @Param() parameter: any): any {
        const code: number = Number(parameter.codDetailPlace);
        if (!isNaN(code)) {
            return this.serviceDetailPlace.delete(code);
        } else {
            return new HttpException("Codigo del detalle no valido", HttpStatus.BAD_REQUEST)
        }
    }
}
