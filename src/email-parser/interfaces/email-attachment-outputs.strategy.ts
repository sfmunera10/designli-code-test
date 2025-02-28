import { Response } from 'express';
import { AttachmentStream, MessageText } from 'mailparser';

export interface IEmailAttatchmentOutputStrategy {
  setOpeningOutput(res: Response): void;
  processEmailAttatchmentOutput(
    emailData: AttachmentStream | MessageText,
    res: Response,
  ): void;
}
