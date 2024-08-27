import { Controller, Get } from '@nestjs/common';
import { DepartamentService } from './departament.service';

@Controller('/department')
export class DepartamentController {

    constructor(private readonly departmentService: DepartamentService){

    }

    @Get("/all")
    public getDepartments(): any {
        return this.departmentService.consult();
    }
}
