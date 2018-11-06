import { Controller, Get, Post, UseGuards, HttpException, HttpStatus, Body, Query, HttpCode, Param } from '@nestjs/common';
import { HeaderValue } from '../../decorators/user.decorator';
import { ArticleService } from '../../service/article.service';
import { AuthorizationGuard } from '../../guard/authorization.guard';

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
  @Get('/:id')
  async getArticle(@Param('id') id: number) {
    return await this.articleService.getArticleById(id);
  }

  @Post()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  async postArticle(@HeaderValue('authorization') token: string, @Body() article: ArticleParams) {
    if (article.content === undefined || article.tags === undefined) { throw new HttpException('Param not enough', HttpStatus.BAD_REQUEST); }
    const articleSaved = await this.articleService.saveArticles(article.content, article.tags, article.title, token);
    return articleSaved;
  }
}
