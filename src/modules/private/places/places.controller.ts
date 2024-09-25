import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Places } from 'src/models/places/places';

@Controller('/places')
export class PlacesController {
    constructor(private readonly servicePlace: PlacesService) {

    }

    @Get("/all")
    public getPlace(): any {
        return this.servicePlace.consult();
    }
    @Post("/add")
    public RoleRegister(@Body() objPlace: Places): any {
        return this.servicePlace.register(objPlace);
    }

    @Get("/one/:codPlace") 
    public consultOneRole(@Param() parameter: any): any {
        const codePlace: number = Number(parameter.codPlace)

        if (!isNaN(codePlace)) {
            return this.servicePlace.consulOne(codePlace);
        } else {
            return new HttpException("El codigo del sitio no existe", HttpStatus.NOT_ACCEPTABLE)
        }
    }

    @Put("/update")
    public updateRole(@Body() objUpdate: Places): any {
        return this.servicePlace.update(objUpdate, objUpdate.codPlace);
    }

    @Put("/update/:codPlace")
    public updateRoleForParameter(@Body() objUpdate: Places, @Param() parameter: any): any {
        const code: number = Number(parameter.codPlace);
        if (!isNaN(code)) {
            return this.servicePlace.update(objUpdate, code)
        } else {
            return new HttpException("Codigo de sitio no valido", HttpStatus.NOT_ACCEPTABLE)
        }
    }

    @Delete("/delete/:codPlace")
    public delete(@Body() objDelete: Places, @Param() parameter: any): any {
        const code: number = Number(parameter.codPlace);
        if (!isNaN(code)) {
            return this.servicePlace.delete(objDelete, code);
        } else {
            return new HttpException("Codigo de sitio no valido", HttpStatus.BAD_REQUEST)
        }
    }
}
