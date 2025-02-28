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
    example: {
      spam: true,
      virus: true,
      dns: true,
      mes: 'septiembre',
      retrasado: false,
      emisor: '61967230-7A45-4A9D-BEC9-87CBCF2211C9',
      receptor: ['recipient'],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad parameters passed to the request (Input JSON).',
    example: {
      message: [
        'Records.0.eventVersion must be a number string',
        'Records.0.ses.receipt.timestamp must be a valid ISO 8601 date string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    example: {
      message: 'Something went wrong when trying to map the input event.',
      error: 'Internal Server Error',
      statusCode: 500,
    },
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
