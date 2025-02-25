import { Injectable } from '@nestjs/common';
import { CreateSesSnsEventMapperDto } from './dto/create-ses-sns-event-mapper.dto';
import { UpdateSesSnsEventMapperDto } from './dto/update-ses-sns-event-mapper.dto';

@Injectable()
export class SesSnsEventMapperService {
  create(createSesSnsEventMapperDto: CreateSesSnsEventMapperDto) {
    return 'This action adds a new sesSnsEventMapper';
  }

  findAll() {
    return `This action returns all sesSnsEventMapper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sesSnsEventMapper`;
  }

  update(id: number, updateSesSnsEventMapperDto: UpdateSesSnsEventMapperDto) {
    return `This action updates a #${id} sesSnsEventMapper`;
  }

  remove(id: number) {
    return `This action removes a #${id} sesSnsEventMapper`;
  }
}
