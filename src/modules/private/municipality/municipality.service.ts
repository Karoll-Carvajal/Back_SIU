import { Injectable } from '@nestjs/common';
import { Municipality } from 'src/models/municipality/municipality';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MunicipalityService {
    private municipalityRepository : Repository<Municipality>

    constructor (private poolConnection : DataSource) {
        this.municipalityRepository = poolConnection.getRepository(Municipality);
    }

    public async consult() : Promise<Municipality[]>{
        try {
            return this.municipalityRepository.find();
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
}
