import { IsEnum, IsOptional } from 'class-validator';
import { EmailAttatchmentOutput } from '../constants';

export class EmailAttachmentOutputQueryDTO {
  @IsOptional()
  @IsEnum(EmailAttatchmentOutput)
  public output: EmailAttatchmentOutput = EmailAttatchmentOutput.ATTACHMENT;
}
