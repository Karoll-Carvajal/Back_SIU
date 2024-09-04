import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { Municipality } from 'src/models/municipality/municipality';

@Module({
  providers: [MunicipalityService],
  controllers: [MunicipalityController]

})
export class MunicipalityModule {}
