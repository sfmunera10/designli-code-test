import { Controller, Post, Body, Inject } from '@nestjs/common';
import { SesSnsEventMapperService } from './providers/ses-sns-event-mapper.service';
import { CreateSesSnsEventDto } from './dto/create-ses-sns-event.dto';
import { MappedSesSnsEvent } from './interfaces/mapped-ses-sns-event';
import { ISesSnsEventMapperService } from './interfaces/ses-sns-event-mapper.service';

@Controller('ses-sns-event-mapper')
export class SesSnsEventMapperController {
  constructor(
    @Inject(SesSnsEventMapperService)
    private readonly sesSnsEventMapperService: ISesSnsEventMapperService,
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
