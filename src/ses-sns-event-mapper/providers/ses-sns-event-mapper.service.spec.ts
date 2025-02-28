import { Test, TestingModule } from '@nestjs/testing';
import { SesSnsEventMapperService } from './ses-sns-event-mapper.service';
import { DynamicObjectMapperService } from './dynamic-object-mapper.service';

describe('SesSnsEventMapperService', () => {
  let service: SesSnsEventMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesSnsEventMapperService, DynamicObjectMapperService],
    }).compile();

    service = module.get<SesSnsEventMapperService>(SesSnsEventMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
