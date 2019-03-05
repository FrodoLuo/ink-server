import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ArticlesController } from './controller/articles/articles.controller';
import { CommentsController } from './controller/comments/comments.controller';
import { MediaController } from './controller/media/media.controller';
import { ArticleService } from './service/article.service';
import { UserService } from './service/user.service';
import { CommentService } from './service/comment.service';
import { UserController } from './controller/user/user.controller';
import { Article } from './entity/article.entity';
import { User } from './entity/user.entity';
import { Comment } from './entity/comment.entity';
import { databaseConfig } from './config/database.config';
import { MediaService } from './service/media.service';
import { Media } from './entity/media.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      Article,
      User,
      Comment,
      Media,
    ]),
  ],
  controllers: [ArticlesController, CommentsController, UserController, MediaController],
  providers: [AppService, ArticleService, UserService, CommentService, MediaService],
})
export class AppModule { }
