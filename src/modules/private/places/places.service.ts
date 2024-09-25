import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Places } from 'src/models/places/places';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PlacesService {
    private repositoryPlaces: Repository<Places>

    constructor(private poolConnection: DataSource) {
        this.repositoryPlaces = poolConnection.getRepository(Places);
    }

    public async consult(): Promise<Places[]> {
        try {
            return this.repositoryPlaces.find();
        } catch (error) {
            throw new HttpException('Fallo la conección', HttpStatus.BAD_REQUEST); /* BAD_REQUEST error 400 */
        }
    }

    /* Verificación de rol  */
    public async placeVerification(name: string): Promise<boolean> {
        console.log(name);
        const exists = await this.repositoryPlaces.findBy({ namePlace: name });
        if (name === undefined) {
            return false;
        }
        return exists.length > 0;

    }

    /* Metodo para registrar  */
    public async register(objPlace: Places): Promise<any> {
        console.log(objPlace);

        if (await this.placeVerification(objPlace.namePlace)) {
            return new HttpException('El sitio ya existe', HttpStatus.BAD_REQUEST)
        } else {
            try {
                return await this.repositoryPlaces.save(objPlace);
            } catch (error) {
                throw new HttpException('Fallo al hacer el registro', HttpStatus.BAD_REQUEST)

            }
        }

    }

    public async consulOne(code: number): Promise<any> {
        try {
            return this.repositoryPlaces.findBy({ codPlace: code });
        } catch (error) {
            throw new HttpException('Fallo al consultar el sitio', HttpStatus.BAD_REQUEST)
        }
    }

   

    public async update(objPlace : Places, code: number) : Promise<any>{
        try {
            if(await this.placeVerification(objPlace.namePlace)){
                return new HttpException("El sitio ya existe" , HttpStatus.BAD_REQUEST)
            }else{
                const objUpdate = await this.repositoryPlaces.update({codPlace :code},objPlace);
                return new  HttpException ({menssage: "Sitio actualizado", objPlace:objUpdate},HttpStatus.OK );
            }
        } catch (error) {
            throw new HttpException("Error al actualizar el sitio", HttpStatus.BAD_REQUEST);
        }
    }

    public async delete(objPlace : Places, code: number) : Promise <any>{
        try {
            return this.repositoryPlaces.delete({codPlace : code});
        } catch (error) {
            throw new HttpException("Error al eliminar el sitio", HttpStatus.BAD_REQUEST)
        }
    }
}
