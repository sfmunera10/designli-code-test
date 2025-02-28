import { Inject, Injectable } from '@nestjs/common';
import { IEmailParserService } from '../interfaces/email-parser.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
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
    this.map.get(output)?.setOpeningOutput(res);
    createReadStream(join(process.cwd(), 'emails', emailUrlOrPath))
      .pipe(new MailParser())
      .on('data', (emailData: AttachmentStream | MessageText) => {
        this.map.get(output)?.processEmailAttatchmentOutput(emailData, res);
      });
  }
}
