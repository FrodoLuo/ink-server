import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Article } from '../entity/article.entity';

import { saveFile } from '../utils/file';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private userService: UserService,
  ) { }

  public getAllArticles(token?: string) {
    return this.articleRepository.find({
      where: token ? { token } : {},
      relations: ['user'],
      order: {
        updateDate: 'DESC',
      },
    });
  }
  public getArticleById(id: number) {
    return this.articleRepository.findOne({
      where: {
        id,
      },
    });
  }
  public async saveArticles(content: string, tags: string, title: string, token: string) {
    let article = this.articleRepository.create();

    // value assign
    article.tags = tags;
    article.title = title;
    article.user = await this.userService.findByToken(token);
    article.mdUrl = '';
    article.brief = content.split(/\r\n|\r|\n/).slice(0, 8).join('\n');
    // file save
    article = await this.articleRepository.save(article);
    article.mdUrl = `data/md/${article.user.id}/${article.id}.md`;
    try {
      await saveFile(`data/md/${article.user.id}`, `${article.id}.md`, content);
      article = await this.articleRepository.save(article);
    } catch (err) {
      throw new HttpException(err, 500);
    }
    return article;
  }
}
