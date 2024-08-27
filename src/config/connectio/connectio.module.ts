import { Global, Module } from '@nestjs/common';
import { Departament } from 'src/models/departament/departament';
import { Municipality } from 'src/models/municipality/municipality';
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
                        type: "postgres", /* Se coloca el nombre del tipo de bd que estamos usando */
                        host: String(process.env.HOST),
                        port: Number(process.env.PORT),
                        username: String(process.env.USER),
                        password: String(process.env.PASSWORD),
                        database: String(process.env.DATA_BASE),
                        synchronize: true,
                        logging: true,
                        namingStrategy: new SnakeNamingStrategy(), /* Con esta libreria se  convierte el pimero en mayuscula al usarlo */
                        entities: [Departament, Municipality]
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
export class ConnectioModule {}
