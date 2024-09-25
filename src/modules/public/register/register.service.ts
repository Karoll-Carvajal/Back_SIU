import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/models/user/user';
import { DataSource, Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { Access } from 'src/models/access/access';
import GenerateToken from 'src/utilities/share/generateToken';
import { ACCESS_SQL } from './registe_sql';


@Injectable()
export class RegisterService {

    private userRepository: Repository<User>;
    private accessRepository: Repository<Access>;

    constructor(poolConnection: DataSource) {
        this.userRepository = poolConnection.getRepository(User);
        this.accessRepository = poolConnection.getRepository(Access);
    }

    public async newUser(objAccess: Access, objUser: User): Promise<any> {
        let codeUser = 0;
        try {
            const existUser = await this.accessRepository.findBy({ nameAccess: objAccess.nameAccess });
            if (existUser.length == 0) {
                codeUser = (await this.userRepository.save(objUser)).codUser;
                const passWorCifred = hashSync(objAccess.passwordAccess)
                objAccess.codUser = codeUser;
                objAccess.passwordAccess = passWorCifred;

                await this.accessRepository.save(objAccess);
                let sessionData = await this.accessRepository.query(ACCESS_SQL.SESSION_DATA, [codeUser])
                const token = GenerateToken.processResponse(sessionData[0]);
                if (token !== '') {
                    return new HttpException({ "tokenApp": token }, HttpStatus.OK)
                } else {
                    return new HttpException("Error al realizar la autenticación del usuario ", HttpStatus.CONFLICT)
                }

            } else {
                return new HttpException("El usuario ya existe ", HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            console.error("Error details: ", error);
            throw new HttpException("Error al registrar el usuario: " + error.message, HttpStatus.CONFLICT);

        }


    }
}
