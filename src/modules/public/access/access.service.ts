import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Access } from 'src/models/access/access';
import { compareSync } from 'bcryptjs';
import { ACCESS_SQL } from '../register/registe_sql';
import GenerateToken from 'src/utilities/share/generateToken';

@Injectable()
export class AccessService {
    private accessRepository: Repository<Access>;

    constructor(private poolConection: DataSource) {
        this.accessRepository = poolConection.getRepository(Access);
    }

    public async session(objaccess: Access): Promise<any> {
        const userExist = await this.accessRepository.findBy({ nameAccess: objaccess.nameAccess });

        if (userExist.length != 0) {
            let passwordAccess = userExist[0].passwordAccess

            if (compareSync(objaccess.passwordAccess, passwordAccess)) { /*  objaccess.passwordAccess viene de la petición */
                try {
                    let sessionData = await this.accessRepository.query(ACCESS_SQL.SESSION_DATA, [userExist[0].codUser]);
                    let tokenSystem = GenerateToken.processResponse(sessionData[0]);
                    console.log(sessionData);

                    if (tokenSystem != "") {
                        return new HttpException({ "Token": tokenSystem }, HttpStatus.OK)
                    } else {
                        throw new HttpException("Fallo al generar la autenticacion", HttpStatus.CONFLICT)
                    }
                } catch (error) {
                    console.log(error);

                    throw new HttpException("Fallo al consultar la información", HttpStatus.NOT_ACCEPTABLE)
                }
            } else {
                return new HttpException("Las claves no coinciden", HttpStatus.NOT_ACCEPTABLE)
            }
        } else {
            return new HttpException("Usuario no registrado", HttpStatus.BAD_REQUEST)
        }
    }

}
