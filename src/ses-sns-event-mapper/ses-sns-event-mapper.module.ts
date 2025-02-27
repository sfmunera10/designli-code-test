import { Module } from '@nestjs/common';
import { SesSnsEventMapperService } from './providers/ses-sns-event-mapper.service';
import { SesSnsEventMapperController } from './ses-sns-event-mapper.controller';
import { DynamicObjectMapperService } from './providers/dynamic-object-mapper.service';

@Module({
  controllers: [SesSnsEventMapperController],
  providers: [SesSnsEventMapperService, DynamicObjectMapperService],
})
export class SesSnsEventMapperModule {}
