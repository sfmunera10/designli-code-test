import { PartialType } from '@nestjs/mapped-types';
import { CreateSesSnsEventMapperDto } from './create-ses-sns-event-mapper.dto';

export class UpdateSesSnsEventMapperDto extends PartialType(CreateSesSnsEventMapperDto) {}
