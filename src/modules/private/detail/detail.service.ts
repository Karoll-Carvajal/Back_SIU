import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Detail } from 'src/models/detail/detail';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DetailService {
    private repositoryDetail: Repository<Detail>

    constructor(private poolConnection: DataSource) {
        this.repositoryDetail = poolConnection.getRepository(Detail);
    }

    public async consult(): Promise<Detail[]> {
        try {
            return this.repositoryDetail.find();
        } catch (error) {
            throw new HttpException('Fallo la conección', HttpStatus.BAD_REQUEST); /* BAD_REQUEST error 400 */
        }
    }

    /* Verificación de rol  */
    public async Verification(name: string): Promise<boolean> {
        console.log(name);
        const exists = await this.repositoryDetail.findBy({ nameDetail: name });
        if (name === undefined) {
            return false;
        }
        return exists.length > 0;

    }

    /* Metodo para registrar  */
    public async register(objDetail: Detail): Promise<any> {
        console.log(objDetail);

        if (await this.Verification(objDetail.nameDetail)) {
            return new HttpException('El detalle ya existe', HttpStatus.BAD_REQUEST)
        } else {
            try {
                return await this.repositoryDetail.save(objDetail);
            } catch (error) {
                throw new HttpException('Fallo al hacer el registro', HttpStatus.BAD_REQUEST)

            }
        }

    }

    public async consulOne(code: number): Promise<any> {
        try {
            return this.repositoryDetail.findBy({ codDetail: code });
        } catch (error) {
            throw new HttpException('Fallo al consultar el detalle', HttpStatus.BAD_REQUEST)
        }
    }

   

    public async update(objDetail : Detail, code: number) : Promise<any>{
        try {
            if(await this.Verification(objDetail.nameDetail)){
                return new HttpException("El detalle ya existe" , HttpStatus.BAD_REQUEST)
            }else{
                const objUpdate = await this.repositoryDetail.update({codDetail :code},objDetail);
                return new  HttpException ({menssage: "detalle actualizado", objDetail:objUpdate},HttpStatus.OK );
            }
        } catch (error) {
            throw new HttpException("Error al actualizar el sitio", HttpStatus.BAD_REQUEST);
        }
    }

    public async delete(objDetail : Detail, code: number) : Promise <any>{
        try {
            return this.repositoryDetail.delete({codDetail : code});
        } catch (error) {
            throw new HttpException("Error al eliminar el detalle", HttpStatus.BAD_REQUEST)
        }
    }
}
