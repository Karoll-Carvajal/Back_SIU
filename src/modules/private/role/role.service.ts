import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { promises } from 'dns';
import { Roles } from 'src/models/roles/roles';
import { DataSource, Entity, Repository } from 'typeorm';

@Injectable()

export class RoleService {
    private repositoryRole: Repository<Roles>

    constructor(private poolConnection: DataSource) {
        this.repositoryRole = poolConnection.getRepository(Roles);
    }

    public async consult(): Promise<Roles[]> {
        try {
            return this.repositoryRole.find();
        } catch (error) {
            throw new HttpException('Fallo la conección', HttpStatus.BAD_REQUEST); /* BAD_REQUEST error 400 */
        }
    }

    /* Verificación de rol  */
    public async roleVerification(name: string): Promise<boolean> {
        console.log(name);
        const exists = await this.repositoryRole.findBy({ nameRole: name });
        if (name === undefined) {
            return false;
        }
        return exists.length > 0;

    }

    /* Metodo para registrar  */
    public async register(objRol: Roles): Promise<any> {
        console.log(objRol);

        if (await this.roleVerification(objRol.nameRole)) {
            return new HttpException('El rol ya existe', HttpStatus.BAD_REQUEST)
        } else {
            try {
                return await this.repositoryRole.save(objRol);
            } catch (error) {
                throw new HttpException('Fallo al hacer el registro', HttpStatus.BAD_REQUEST)

            }
        }

    }

    public async consulOne(code: number): Promise<any> {
        try {
            return this.repositoryRole.findBy({ codRole: code });
        } catch (error) {
            throw new HttpException('Fallo al consultar el rol', HttpStatus.BAD_REQUEST)
        }
    }

   

    public async update(objRol : Roles, code: number) : Promise<any>{
        try {
            if(await this.roleVerification(objRol.nameRole)){
                return new HttpException("El rol ya existe" , HttpStatus.BAD_REQUEST)
            }else{
                const objUpdate = await this.repositoryRole.update({codRole :code},objRol);
                return new  HttpException ({menssage: "Rol actualizado", objRol:objUpdate},HttpStatus.OK );
            }
        } catch (error) {
            throw new HttpException("Error al actualizar el rol", HttpStatus.BAD_REQUEST);
        }
    }

    public async delete(objRol : Roles, code: number) : Promise <any>{
        try {
            return this.repositoryRole.delete({codRole : code});
        } catch (error) {
            throw new HttpException("Error al eliminar el rol", HttpStatus.BAD_REQUEST)
        }
    }
}
