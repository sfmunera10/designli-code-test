import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesSnsEventMapperModule } from './ses-sns-event-mapper/ses-sns-event-mapper.module';

@Module({
  imports: [SesSnsEventMapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
