import { Module } from '@nestjs/common';
import { EmailParserService } from './providers/email-parser.service';
import { EmailParserController } from './email-parser.controller';
import {
  AttachmentOutputStrategy,
  BodyOutputStrategy,
  WebpageOutputStrategy,
} from './providers/email-attachment-outputs.strategy';

@Module({
  controllers: [EmailParserController],
  providers: [
    EmailParserService,
    AttachmentOutputStrategy,
    BodyOutputStrategy,
    WebpageOutputStrategy,
  ],
})
export class EmailParserModule {}
