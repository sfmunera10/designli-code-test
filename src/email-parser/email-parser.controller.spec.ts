import { Test, TestingModule } from '@nestjs/testing';
import { EmailParserController } from './email-parser.controller';
import { EmailParserService } from './providers/email-parser.service';
import {
  AttachmentOutputStrategy,
  BodyOutputStrategy,
  WebpageOutputStrategy,
} from './providers/email-attachment-outputs.strategy';

describe('EmailParserController', () => {
  let controller: EmailParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailParserController],
      providers: [
        EmailParserService,
        AttachmentOutputStrategy,
        BodyOutputStrategy,
        WebpageOutputStrategy,
      ],
    }).compile();

    controller = module.get<EmailParserController>(EmailParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
