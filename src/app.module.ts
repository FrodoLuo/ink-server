import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ArticlesController } from './controller/articles/articles.controller';
import { CommentsController } from './controller/comments/comments.controller';
import { ArticleService } from './service/article.service';
import { UserService } from './service/user.service';
import { UserController } from './controller/user/user.controller';
import { Article } from 'entity/article.entity';
import { User } from 'entity/user.entity';
import {databaseConfig} from 'config/database.config';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      Article,
      User,
    ]),
  ],
  controllers: [ArticlesController, CommentsController, UserController],
  providers: [AppService, ArticleService, UserService],
})
export class AppModule { }
