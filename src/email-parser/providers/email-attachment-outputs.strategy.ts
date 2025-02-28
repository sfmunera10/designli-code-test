import { AttachmentStream, MessageText } from 'mailparser';
import { IEmailAttatchmentOutputStrategy } from '../interfaces/email-attachment-outputs.strategy';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { emailDataType } from '../constants';
import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class AttachmentOutputStrategy
  implements IEmailAttatchmentOutputStrategy
{
  setOpeningOutput(res: Response) {
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="attachment.json"',
    });
  }
  processEmailAttatchmentOutput(
    emailData: AttachmentStream | MessageText,
    res: Response,
  ): void {
    if (emailData.type === emailDataType.ATTACHMENT) {
      emailData.content.pipe(res);
      emailData.content.on('end', () => emailData.release());
    }
  }
}

@Injectable()
export class BodyOutputStrategy implements IEmailAttatchmentOutputStrategy {
  setOpeningOutput(res: Response) {
    res.set({
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.write(`<main>`);
  }
  processEmailAttatchmentOutput(
    emailData: AttachmentStream | MessageText,
    res: Response,
  ): void {
    if (emailData.type === emailDataType.TEXT) {
      res.write(`<p>Message: ${emailData.text ?? 'No message'}</p>`);
      res.write(`</main>`);
      res.end();
    }
    if (emailData.type === emailDataType.ATTACHMENT) {
      emailData.content.pipe(
        createWriteStream(join(process.cwd(), 'public', 'attachment.json')),
      );
      emailData.content.on('end', () => {
        emailData.release();
        res.write(
          `<p>Attachment link <a href="http://localhost:3000/attachment.json">here</a></p>`,
        );
      });
    }
  }
}

@Injectable()
export class WebpageOutputStrategy implements IEmailAttatchmentOutputStrategy {
  private webpageWriteStream: WriteStream;
  private emailFileName: string;

  setOpeningOutput(res: Response) {
    res.set({
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.write(`<main>`);
    this.emailFileName = randomUUID();
    this.webpageWriteStream = createWriteStream(
      join(process.cwd(), 'public', `${this.emailFileName}.html`),
    );
    this.webpageWriteStream.write(
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Email attachment</title></head><body>`,
    );
  }
  processEmailAttatchmentOutput(
    emailData: AttachmentStream | MessageText,
    res: Response,
  ): void {
    if (emailData.type === emailDataType.TEXT) {
      res.write(`<p>Message: ${emailData.text ?? 'No message'}</p>`);
      res.write(`</main>`);
      res.end();
      this.webpageWriteStream.write(
        (emailData.textAsHtml ?? '').concat(`</body></html>`),
      );
      this.webpageWriteStream.end();
    }
    if (emailData.type === emailDataType.ATTACHMENT) {
      emailData.content.pipe(
        createWriteStream(join(process.cwd(), 'public', 'attachment.json')),
      );
      emailData.content.on('end', () => {
        emailData.release();
        this.webpageWriteStream.write(
          `<p>Attachment link <a href="http://localhost:3000/attachment.json">here</a></p>`,
        );
        res.write(
          `<p>Webpage link <a href="http://localhost:3000/${this.emailFileName}.html">here</a></p>`,
        );
      });
    }
  }
}
