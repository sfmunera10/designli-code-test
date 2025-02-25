import { Module } from '@nestjs/common';
import { SesSnsEventMapperService } from './ses-sns-event-mapper.service';
import { SesSnsEventMapperController } from './ses-sns-event-mapper.controller';

@Module({
  controllers: [SesSnsEventMapperController],
  providers: [SesSnsEventMapperService],
})
export class SesSnsEventMapperModule {}
