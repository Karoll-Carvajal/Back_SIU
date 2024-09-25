import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';

@Module({
  providers: [DetailService],
  controllers: [DetailController]
})
export class DetailModule {}
