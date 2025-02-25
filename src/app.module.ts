import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesSnsEventMapperModule } from './ses-sns-event-mapper/ses-sns-event-mapper.module';
import { EmailParserModule } from './email-parser/email-parser.module';

@Module({
  imports: [SesSnsEventMapperModule, EmailParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
