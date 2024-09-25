import { Module } from '@nestjs/common';
import { DetailPlaceService } from './detail_place.service';
import { DetailPlaceController } from './detail_place.controller';

@Module({
  providers: [DetailPlaceService],
  controllers: [DetailPlaceController]
})
export class DetailPlaceModule {}
