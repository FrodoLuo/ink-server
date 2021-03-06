import { Controller, Get, Post, UseGuards, HttpException, HttpStatus, Body, Query, HttpCode, Param, Delete, Patch } from '@nestjs/common';
import { HeaderValue } from '../../decorators/user.decorator';
import { ArticleService } from '../../service/article.service';
import { AuthorizationGuard } from '../../guard/authorization.guard';
import { Article } from '../../entity/article.entity';

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
  async getArticles(
    @Query('user') user: boolean,
    @Query('page') page: number,
    @Query('keyword') keyword?: string,
    @HeaderValue('authorization') token?: string,
  ) {
    if (user) {
      return await this.articleService.getAllArticles(page, keyword, token);
    } else {
      return await this.articleService.getAllArticles(page, keyword);
    }
  }
  @Get('/:id')
  async getArticle(@Param('id') id: number) {
    return await this.articleService.getArticleById(id);
  }
  @Delete('/:id')
  @UseGuards(AuthorizationGuard)
  async deleteArticle(@HeaderValue('authorization') token: string, @Param('id') id: number) {
    return await this.articleService.deleteArticleById(token, id);
  }

  @Patch()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  async modifyArticle(@HeaderValue('authorization') token: string, @Body('article') article: Article, @Body('content') content: string) {
    const articleSaved = await this.articleService.modifyArticle(article, content, token);
    return articleSaved;
  }

  @Post()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  async postArticle(@HeaderValue('authorization') token: string, @Body() article: ArticleParams) {
    if (article.content === undefined || article.tags === undefined) { throw new HttpException('Param not enough', HttpStatus.BAD_REQUEST); }
    return await this.articleService.saveArticles(article.content, article.tags, article.title, token);
  }
}
