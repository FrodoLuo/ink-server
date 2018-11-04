import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from 'entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';

import { saveFile } from 'utils/file';

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
    this.articleRepository.save(article);
    return saveFile(`data/md/${article.user.id}`, `${article.id}.md`, content);
  }
}