import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesSnsEventMapperModule } from './ses-sns-event-mapper/ses-sns-event-mapper.module';
import { EmailParserModule } from './email-parser/email-parser.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    SesSnsEventMapperModule,
    EmailParserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
