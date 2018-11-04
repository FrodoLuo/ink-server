import { Controller, Get, Post, UseGuards, HttpException, HttpStatus, Body, Query, HttpCode } from '@nestjs/common';
import { Article } from 'entity/article.entity';
import { User } from 'entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HeaderValue } from 'decorators/user.decorator';
import { ArticleService } from 'service/article.service';
import { AuthorizationGuard } from 'guard/authorization.guard';

interface ArticleParams {
  title: string;
  content: string;
  tags: string;
}

@Controller('articles')
export class ArticlesController {

  constructor(
    private articleService: ArticleService,
  ) { }

  @Get()
  async getArticles(@Query() user?: boolean, @HeaderValue('authorization') token?: string) {
    if (user) {
      return await this.articleService.getAllArticles(token);
    } else {
      return await this.articleService.getAllArticles();
    }
  }

  @Post()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  async postArticle(@HeaderValue('authorization') token: string, @Body() article: ArticleParams) {
    if (article.content === undefined || article.tags === undefined) { throw new HttpException('Param not enough', HttpStatus.BAD_REQUEST); }
    const status = await this.articleService.saveArticles(article.content, article.tags, article.title, token);
    if (status.success) {
      return 'success';
    } else {
      throw new HttpException(status.err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
