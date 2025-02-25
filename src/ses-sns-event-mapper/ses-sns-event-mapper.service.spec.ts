import { Test, TestingModule } from '@nestjs/testing';
import { SesSnsEventMapperService } from './ses-sns-event-mapper.service';

describe('SesSnsEventMapperService', () => {
  let service: SesSnsEventMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesSnsEventMapperService],
    }).compile();

    service = module.get<SesSnsEventMapperService>(SesSnsEventMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
