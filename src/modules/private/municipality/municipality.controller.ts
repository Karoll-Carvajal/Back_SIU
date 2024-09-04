import { Departament } from 'src/models/departament/departament';
import { MunicipalityService } from './municipality.service';
import { All, Controller, Get } from '@nestjs/common';

@Controller('/municipality')
export class MunicipalityController {

    constructor(private readonly municipalityService :MunicipalityService ){

    }

   @Get("/all")
    public getMunicipality() : any{
        return this.municipalityService.consult();
    }

}
