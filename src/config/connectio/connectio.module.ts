import { Global, Module } from '@nestjs/common';
import { Departament } from 'src/models/departament/departament';
import { Municipality } from 'src/models/municipality/municipality';
import { Roles } from 'src/models/roles/roles';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            inject: [],
            useFactory: async () => {/* Genera la conección */
                try {
                    const poolConnection = new DataSource({
                        type: "postgres",
                        host: String(process.env.HOST),
                        port: Number(process.env.PORT),
                        username: String(process.env.USER),
                        password: String(process.env.PASSWORD),
                        database: String(process.env.DATA_BASE),
                        synchronize: true, //Se sincroniza en la bd
                        logging: true, //Ocuta la información de la bd
                        namingStrategy: new SnakeNamingStrategy(), /* Con esta libreria se  convierte el primero en mayuscula al usarlo */
                        entities: [Departament, Municipality, Roles]
                    });
                    await poolConnection.initialize();
                    console.log('Connection estableced with: ' + String(process.env.DATA_BASE));
                    return poolConnection;
                } catch (myError) {
                    console.log("Fail the connection of the data base ");
                    throw myError
                }
            }
        }
    ],
    exports: [DataSource],
})
export class ConnectioModule { }
