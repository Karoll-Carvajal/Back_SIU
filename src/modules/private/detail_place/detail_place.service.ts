import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DetailPlace } from 'src/models/detail-place/detail-place';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DetailPlaceService {
    private repositoryDetailPlace: Repository<DetailPlace>;

    constructor(private poolConnection: DataSource) {
        this.repositoryDetailPlace = poolConnection.getRepository(DetailPlace);
    }

    public async consult(): Promise<DetailPlace[]> {
        try {
            return this.repositoryDetailPlace.find();
        } catch (error) {
            throw new HttpException('Falló la conexión', HttpStatus.BAD_REQUEST); 
        }
    }

    public async Verification(codPlace: number, codDetail: number): Promise<boolean> {
        const exists = await this.repositoryDetailPlace.findBy({ codPlace, codDetail });
        return exists.length > 0;  
    }

    public async register(objDetailPlace: DetailPlace): Promise<any> {
        console.log(objDetailPlace);

        if (await this.Verification(objDetailPlace.codPlace, objDetailPlace.codDetail)) {
            throw new HttpException('Ya existe', HttpStatus.BAD_REQUEST);
        } else {
            try {
                const newDetail = await this.repositoryDetailPlace.save(objDetailPlace);
                return { message: 'Registro exitoso', detail: newDetail };
            } catch (error) {
                console.error(error)
                throw new HttpException('Falló al hacer el registro', HttpStatus.BAD_REQUEST);
            }
        }
    }

    public async consultOne(code: number): Promise<any> {
        try {
            return this.repositoryDetailPlace.findBy({ codDetailPlace: code });
        } catch (error) {
            throw new HttpException('Falló al consultar el detalle', HttpStatus.BAD_REQUEST);
        }
    }

    

    public async update(objDetailPlace: DetailPlace, code: number): Promise<any> {
        try {
            const exists = await this.Verification(objDetailPlace.codPlace, objDetailPlace.codDetail);
            
            if (exists) {
                return new HttpException("Ya existe, no es posible realizar la actualización", HttpStatus.BAD_REQUEST);
            } else {
                const objUpdate = await this.repositoryDetailPlace.update({ codDetailPlace: code }, objDetailPlace);
                return new HttpException({ message: "Detalle actualizado", objDetail: objUpdate }, HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException("Error al actualizar el sitio", HttpStatus.BAD_REQUEST);
        }
    }
    

    public async delete(code: number): Promise<any> {
        try {
            const deleteResult = await this.repositoryDetailPlace.delete({ codDetailPlace: code });
            return { message: 'Eliminación exitosa', result: deleteResult };
        } catch (error) {
            throw new HttpException('Error al eliminar el detalle', HttpStatus.BAD_REQUEST);
        }
    }
}
