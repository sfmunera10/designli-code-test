import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SesVerdict } from '../interfaces/ses-sns-event';
import { Type } from 'class-transformer';

class SesReceipt {
  @IsNotEmpty()
  @IsDateString({ strict: true })
  timestamp: Date;

  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsPositive()
  processingTimeMillis: number;

  @IsNotEmpty()
  @IsArray()
  recipients: string[];

  @IsNotEmpty()
  @IsObject()
  spamVerdict: SesVerdict;

  @IsNotEmpty()
  @IsObject()
  virusVerdict: SesVerdict;

  @IsNotEmpty()
  @IsObject()
  spfVerdict: SesVerdict;

  @IsNotEmpty()
  @IsObject()
  dkimVerdict: SesVerdict;

  @IsNotEmpty()
  @IsObject()
  dmarcVerdict: SesVerdict;

  @IsNotEmpty()
  @IsString()
  dmarcPolicy: string;

  @IsNotEmpty()
  @IsObject()
  action: {
    type: string;
    topicArn: string;
  };
}

class SesMail {
  @IsNotEmpty()
  @IsDateString({ strict: true })
  timestamp: Date;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  messageId: string;

  @IsNotEmpty()
  @IsArray()
  destination: string[];

  @IsNotEmpty()
  @IsBoolean()
  headersTruncated: boolean;

  @IsNotEmpty()
  @IsArray()
  headers: {
    name: string;
    value: string;
  }[];

  @IsNotEmpty()
  @IsObject()
  commonHeaders: {
    returnPath: string;
    from: string[];
    date: Date;
    to: string[];
    messageId: string;
    subject: string;
  };
}
class SesRecord {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SesReceipt)
  receipt: SesReceipt;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SesMail)
  mail: SesMail;
}
class SesSnsEventRecord {
  @IsNotEmpty()
  @IsNumberString()
  eventVersion: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SesRecord)
  ses: SesRecord;

  @IsNotEmpty()
  @IsString()
  eventSource: string;
}
export class CreateSesSnsEventDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => SesSnsEventRecord)
  Records: SesSnsEventRecord[];
}
