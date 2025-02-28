import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailParserService } from './providers/email-parser.service';
import { Response } from 'express';
import { IEmailParserService } from './interfaces/email-parser.service';
import { EmailAttachmentOutputQueryDTO } from './dto';
import {
  ApiOperation,
  ApiTags,
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { EmailUrlPathValidationPipe } from './providers/email-url-path.pipe';

@ApiTags('email-parser')
@Controller('email-parser')
export class EmailParserController {
  constructor(
    @Inject(EmailParserService)
    private readonly emailParserService: IEmailParserService,
  ) {}
  @Get(':resource')
  @ApiOperation({ summary: 'Retrieve email attachment from email file' })
  @ApiQuery({
    name: `output`,
    description: `Query parameter for the email attachment output. Can be 'attachment', 'body', or 'webpage'`,
    required: false,
    type: String,
  })
  @ApiAcceptedResponse({
    description: 'Attachment retrieved.',
    examples: {
      attachment: {
        summary: `Response if you pass 'attachment' as query parameter (You get the attached file, in this example, its a JSON file).`,
        value: {
          Records: [
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
                    topicArn:
                      'arn:aws:sns:us-east-1:012345678912:example-topic',
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
                      value:
                        '<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>',
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
                    messageId:
                      '<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>',
                    subject: 'Example subject',
                  },
                },
              },
              eventSource: 'aws:ses',
            },
          ],
        },
      },
      body: {
        summary: `Response if you pass 'body' as query parameter (You get the body from the email with a link to the attached file).`,
        value: `<main><p>Attachment link <a href="http://localhost:3000/attachment.json">here</a></p><p>Message: FYI.</p></main>`,
      },
      webpage: {
        summary: `Response if you pass 'webpage' as query parameter (You get the body from the email with a link to a webpage that holds a link to the attached file).`,
        value: `<main><p>Webpage link <a href="http://localhost:3000/94d48fc2-efd9-44d6-8c88-e095a658b4e8.html">here</a></p><p>Message: FYI.</p></main>`,
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Bad parameters passed to the request (email Url or Path & output).',
    examples: {
      badOutputQuery: {
        summary: `Response if you pass a wrong 'output' query parameter`,
        value: {
          message: [
            'output must be one of the following values: attachment, body, webpage',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
      badResourcePath: {
        summary: `Response if you pass an empty 'resource' path parameter`,
        value: {
          message: 'ENOENT: no such file or directory',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    example: {
      message:
        'Something went wrong when trying to access and parse the email file',
      error: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  )
  getEmailAttatchment(
    @Param('resource', EmailUrlPathValidationPipe)
    emailUrlOrPath: string,
    @Res() res: Response,
    @Query()
    query: EmailAttachmentOutputQueryDTO,
  ) {
    this.emailParserService.getEmailAttatchment(
      emailUrlOrPath,
      res,
      query.output,
    );
  }
}
