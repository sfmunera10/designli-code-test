import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SesSnsEventMapperService } from './ses-sns-event-mapper.service';
import { CreateSesSnsEventMapperDto } from './dto/create-ses-sns-event-mapper.dto';
import { UpdateSesSnsEventMapperDto } from './dto/update-ses-sns-event-mapper.dto';

@Controller('ses-sns-event-mapper')
export class SesSnsEventMapperController {
  constructor(private readonly sesSnsEventMapperService: SesSnsEventMapperService) {}

  @Post()
  create(@Body() createSesSnsEventMapperDto: CreateSesSnsEventMapperDto) {
    return this.sesSnsEventMapperService.create(createSesSnsEventMapperDto);
  }

  @Get()
  findAll() {
    return this.sesSnsEventMapperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesSnsEventMapperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSesSnsEventMapperDto: UpdateSesSnsEventMapperDto) {
    return this.sesSnsEventMapperService.update(+id, updateSesSnsEventMapperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesSnsEventMapperService.remove(+id);
  }
}
