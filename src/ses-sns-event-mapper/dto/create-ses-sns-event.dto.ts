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
import { ApiProperty } from '@nestjs/swagger';

class SesReceipt {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({ strict: true })
  timestamp: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsPositive()
  processingTimeMillis: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  recipients: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  spamVerdict: SesVerdict;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  virusVerdict: SesVerdict;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  spfVerdict: SesVerdict;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  dkimVerdict: SesVerdict;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  dmarcVerdict: SesVerdict;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dmarcPolicy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  action: {
    type: string;
    topicArn: string;
  };
}

class SesMail {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({ strict: true })
  timestamp: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  messageId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  destination: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  headersTruncated: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  headers: {
    name: string;
    value: string;
  }[];

  @ApiProperty()
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
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SesReceipt)
  receipt: SesReceipt;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SesMail)
  mail: SesMail;
}
class SesSnsEventRecord {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  eventVersion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SesRecord)
  ses: SesRecord;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventSource: string;
}
export class CreateSesSnsEventDto {
  @ApiProperty({
    example: [
      {
        eventVersion: '1.0',
        ses: {
          receipt: {
            timestamp: '2015-09-11T20:32:33.936Z',
            processingTimeMillis: 222,
            recipients: ['recipient@example.com'],
            spamVerdict: {
              status: 'PASS',
            },
            virusVerdict: {
              status: 'PASS',
            },
            spfVerdict: {
              status: 'PASS',
            },
            dkimVerdict: {
              status: 'PASS',
            },
            dmarcVerdict: {
              status: 'PASS',
            },
            dmarcPolicy: 'reject',
            action: {
              type: 'SNS',
              topicArn: 'arn:aws:sns:us-east-1:012345678912:example-topic',
            },
          },
          mail: {
            timestamp: '2015-09-11T20:32:33.936Z',
            source: '61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com',
            messageId: 'd6iitobk75ur44p8kdnnp7g2n800',
            destination: ['recipient@example.com'],
            headersTruncated: false,
            headers: [
              {
                name: 'Return-Path',
                value:
                  '<0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com>',
              },
              {
                name: 'Received',
                value:
                  'from a9-183.smtp-out.amazonses.com (a9-183.smtp-out.amazonses.com [54.240.9.183]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id d6iitobk75ur44p8kdnnp7g2n800 for recipient@example.com; Fri, 11 Sep 2015 20:32:33 +0000 (UTC)',
              },
              {
                name: 'DKIM-Signature',
                value:
                  'v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ug7nbtf4gccmlpwj322ax3p6ow6yfsug; d=amazonses.com; t=1442003552; h=From:To:Subject:MIME-Version:Content-Type:Content-Transfer-Encoding:Date:Message-ID:Feedback-ID; bh=DWr3IOmYWoXCA9ARqGC/UaODfghffiwFNRIb2Mckyt4=; b=p4ukUDSFqhqiub+zPR0DW1kp7oJZakrzupr6LBe6sUuvqpBkig56UzUwc29rFbJF hlX3Ov7DeYVNoN38stqwsF8ivcajXpQsXRC1cW9z8x875J041rClAjV7EGbLmudVpPX 4hHst1XPyX5wmgdHIhmUuh8oZKpVqGi6bHGzzf7g=',
              },
              {
                name: 'From',
                value: 'sender@example.com',
              },
              {
                name: 'To',
                value: 'recipient@example.com',
              },
              {
                name: 'Subject',
                value: 'Example subject',
              },
              {
                name: 'MIME-Version',
                value: '1.0',
              },
              {
                name: 'Content-Type',
                value: 'text/plain; charset=UTF-8',
              },
              {
                name: 'Content-Transfer-Encoding',
                value: '7bit',
              },
              {
                name: 'Date',
                value: 'Fri, 11 Sep 2015 20:32:32 +0000',
              },
              {
                name: 'Message-ID',
                value: '<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>',
              },
              {
                name: 'X-SES-Outgoing',
                value: '2015.09.11-54.240.9.183',
              },
              {
                name: 'Feedback-ID',
                value:
                  '1.us-east-1.Krv2FKpFdWV+KUYw3Qd6wcpPJ4Sv/pOPpEPSHn2u2o4=:AmazonSES',
              },
            ],
            commonHeaders: {
              returnPath:
                '0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com',
              from: ['sender@example.com'],
              date: 'Fri, 11 Sep 2015 20:32:32 +0000',
              to: ['recipient@example.com'],
              messageId: '<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>',
              subject: 'Example subject',
            },
          },
        },
        eventSource: 'aws:ses',
      },
    ],
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => SesSnsEventRecord)
  Records: SesSnsEventRecord[];
}
