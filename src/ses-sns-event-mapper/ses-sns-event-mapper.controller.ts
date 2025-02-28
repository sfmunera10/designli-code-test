import {
  Controller,
  Post,
  Body,
  Inject,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SesSnsEventMapperService } from './providers/ses-sns-event-mapper.service';
import { CreateSesSnsEventDto } from './dto/create-ses-sns-event.dto';
import { MappedSesSnsEvent } from './interfaces/mapped-ses-sns-event';
import { ISesSnsEventMapperService } from './interfaces/ses-sns-event-mapper.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('ses-sns-event-mapper')
@Controller('ses-sns-event-mapper')
export class SesSnsEventMapperController {
  constructor(
    @Inject(SesSnsEventMapperService)
    private readonly sesSnsEventMapperService: ISesSnsEventMapperService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Retrieve email attachment from email file' })
  @ApiCreatedResponse({
    description:
      'Input JSON received and output JSON resource created and returned.',
    type: String,
  })
  @ApiBadRequestResponse({
    description: 'Bad parameters passed to the request (Input JSON).',
    type: Array<string>,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    type: String,
  })
  @UsePipes(new ValidationPipe())
  createMappedSeSSnsEvent(
    @Body() createSesSnsEventMapperDto: CreateSesSnsEventDto,
  ): MappedSesSnsEvent {
    return this.sesSnsEventMapperService.createMappedSeSSnsEvent(
      createSesSnsEventMapperDto,
    );
  }
}
