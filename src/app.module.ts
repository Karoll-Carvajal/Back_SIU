import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConnectioModule } from './config/connectio/connectio.module';
import { DepartamentModule } from './modules/private/departament/departament.module';
import { MunicipalityModule } from './modules/private/municipality/municipality.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }), ConnectioModule, DepartamentModule, MunicipalityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
