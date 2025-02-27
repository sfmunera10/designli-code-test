import { Controller, Get, Param, Res } from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AttachmentStream, MailParser, MessageText } from 'mailparser';
import { Response } from 'express';

@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}
  @Get(':resource')
  getEmailAttatchment(
    @Param('resource') emailUrlOrPath: string,
    @Res() res: Response,
  ) {
    createReadStream(join(process.cwd(), 'emails', emailUrlOrPath))
      .pipe(new MailParser())
      .on('data', (data: AttachmentStream | MessageText) => {
        if (data.type === 'attachment') {
          data.content.pipe(res);
          data.content.on('end', () => data.release());
        }
      });
  }
}
