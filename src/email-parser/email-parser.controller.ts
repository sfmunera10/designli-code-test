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
  @ApiAcceptedResponse({
    description: 'Attachment retrieved.',
    type: String,
  })
  @ApiBadRequestResponse({
    description:
      'Bad parameters passed to the request (email Url or Path & output).',
    type: Array<string>,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    type: String,
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  )
  getEmailAttatchment(
    @Param('resource', EmailUrlPathValidationPipe) emailUrlOrPath: string,
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
