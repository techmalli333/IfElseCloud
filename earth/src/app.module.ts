import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorModule } from './translator/translator.module';
import { EarthModule } from './earth/earth.module';

@Module({
  imports: [TranslatorModule, EarthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
