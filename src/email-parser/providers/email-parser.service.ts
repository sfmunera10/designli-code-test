import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IEmailParserService } from '../interfaces/email-parser.service';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { AttachmentStream, MailParser, MessageText } from 'mailparser';
import { join } from 'path';
import { EmailAttatchmentOutput } from '../constants';
import { IEmailAttatchmentOutputStrategy } from '../interfaces/email-attachment-outputs.strategy';
import {
  AttachmentOutputStrategy,
  BodyOutputStrategy,
  WebpageOutputStrategy,
} from './email-attachment-outputs.strategy';

@Injectable()
export class EmailParserService implements IEmailParserService {
  private map: Map<EmailAttatchmentOutput, IEmailAttatchmentOutputStrategy>;

  constructor(
    @Inject(AttachmentOutputStrategy)
    attachmentOutputStrategy: IEmailAttatchmentOutputStrategy,
    @Inject(BodyOutputStrategy)
    bodyOutputStrategy: IEmailAttatchmentOutputStrategy,
    @Inject(WebpageOutputStrategy)
    webpageOutputStrategy: IEmailAttatchmentOutputStrategy,
  ) {
    this.map = new Map();
    this.map.set(EmailAttatchmentOutput.ATTACHMENT, attachmentOutputStrategy);
    this.map.set(EmailAttatchmentOutput.BODY, bodyOutputStrategy);
    this.map.set(EmailAttatchmentOutput.WEBPAGE, webpageOutputStrategy);
  }

  getEmailAttatchment(
    emailUrlOrPath: string,
    res: Response,
    output: EmailAttatchmentOutput,
  ): void {
    const customErrorResponse = {
      message:
        'Something went wrong when trying to access and parse the email file',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    const emailFilePath = join(process.cwd(), 'emails', emailUrlOrPath);
    if (!existsSync(emailFilePath)) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(customErrorResponse);
      return;
    }
    this.map.get(output)?.setOpeningOutput(res);
    createReadStream(emailFilePath)
      .pipe(new MailParser())
      .on('data', (emailData: AttachmentStream | MessageText) => {
        this.map.get(output)?.processEmailAttatchmentOutput(emailData, res);
      });
  }
}
