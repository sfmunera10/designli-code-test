import { Test, TestingModule } from '@nestjs/testing';
import { SesSnsEventMapperController } from './ses-sns-event-mapper.controller';
import { SesSnsEventMapperService } from './providers/ses-sns-event-mapper.service';
import { DynamicObjectMapperService } from './providers/dynamic-object-mapper.service';

describe('SesSnsEventMapperController', () => {
  let controller: SesSnsEventMapperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SesSnsEventMapperController],
      providers: [SesSnsEventMapperService, DynamicObjectMapperService],
    }).compile();

    controller = module.get<SesSnsEventMapperController>(
      SesSnsEventMapperController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
