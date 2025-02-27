import { Controller, Post, Body } from '@nestjs/common';
import { SesSnsEventMapperService } from './providers/ses-sns-event-mapper.service';
import { CreateSesSnsEventDto } from './dto/create-ses-sns-event.dto';
import { MappedSesSnsEvent } from './interfaces/mapped-ses-sns-event';

@Controller('ses-sns-event-mapper')
export class SesSnsEventMapperController {
  constructor(
    private readonly sesSnsEventMapperService: SesSnsEventMapperService,
  ) {}

  @Post()
  createMappedSeSSnsEvent(
    @Body() createSesSnsEventMapperDto: CreateSesSnsEventDto,
  ): MappedSesSnsEvent {
    return this.sesSnsEventMapperService.createMappedSeSSnsEvent(
      createSesSnsEventMapperDto,
    );
  }
}
