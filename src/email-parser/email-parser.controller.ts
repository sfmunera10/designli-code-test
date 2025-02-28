import { Controller, Get, Inject, Param, Query, Res } from '@nestjs/common';
import { EmailParserService } from './providers/email-parser.service';
import { Response } from 'express';
import { IEmailParserService } from './interfaces/email-parser.service';
import { EmailAttatchmentOutput } from './constants';

@Controller('email-parser')
export class EmailParserController {
  constructor(
    @Inject(EmailParserService)
    private readonly emailParserService: IEmailParserService,
  ) {}
  @Get(':resource')
  getEmailAttatchment(
    @Param('resource') emailUrlOrPath: string,
    @Res() res: Response,
    @Query('output')
    output: EmailAttatchmentOutput = EmailAttatchmentOutput.ATTACHMENT,
  ) {
    this.emailParserService.getEmailAttatchment(emailUrlOrPath, res, output);
  }
}
