import { Injectable, Type } from '@nestjs/common';
import { error } from 'console';
import { Departament } from 'src/models/departament/departament';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DepartamentService {

    private departmentRepository : Repository<Departament>;

    constructor(private poolConnection : DataSource){
        this.departmentRepository  = poolConnection.getRepository(Departament);
    }

    public async consult():Promise<Departament[]>{
        try {
             return this.departmentRepository.find(); 
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}
