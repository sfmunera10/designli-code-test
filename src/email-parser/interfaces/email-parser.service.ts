import { Response } from 'express';
import { EmailAttatchmentOutput } from '../constants';

export interface IEmailParserService {
  getEmailAttatchment(
    emailUrlOrPath: string,
    res: Response,
    output: EmailAttatchmentOutput,
  ): void;
}
