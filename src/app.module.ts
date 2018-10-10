import { Module } from '@nestjs/common';
import { AppController, ArticlesController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ArticlesController],
  providers: [AppService],
})
export class AppModule {}
