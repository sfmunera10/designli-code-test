import { Test, TestingModule } from '@nestjs/testing';
import { EmailParserService } from './email-parser.service';
import {
  AttachmentOutputStrategy,
  BodyOutputStrategy,
  WebpageOutputStrategy,
} from './email-attachment-outputs.strategy';

describe('EmailParserService', () => {
  let service: EmailParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailParserService,
        AttachmentOutputStrategy,
        BodyOutputStrategy,
        WebpageOutputStrategy,
      ],
    }).compile();

    service = module.get<EmailParserService>(EmailParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
