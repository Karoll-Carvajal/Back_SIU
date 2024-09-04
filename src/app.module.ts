import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConnectioModule } from './config/connectio/connectio.module';
import { PublicModule } from './modules/public/public.module';
import { PrivateModule } from './modules/private/private.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }), ConnectioModule, PublicModule, PrivateModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
