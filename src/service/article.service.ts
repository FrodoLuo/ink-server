import { Injectable, HttpException } from '@nestjs/common';
import { Repository, Timestamp } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Article } from '../entity/article.entity';

import { saveFile } from '../utils/file';
import { ErrorException, DeniedException } from '../exceptions';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private userService: UserService,
  ) { }

  public getAllArticles(page: number, keyword?: string, token?: string) {
    let query = this.articleRepository.createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .where('article.deleted = false');
    if (token) {
      query = query.andWhere('user.token = :token', { token });
    }
    if (keyword) {
      query = query.andWhere('article.tags LIKE :keyword or article.title like :keyword', { keyword: `%${keyword}%` });
    }
    query = query.orderBy('article.updateDate', 'DESC')
      .skip((page || 0) * 10)
      .take(10);
    return query.getMany();
  }
  public getArticleById(id: number) {
    return this.articleRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }
  public async saveArticles(content: string, tags: string, title: string, token: string) {
    let article = this.articleRepository.create();

    // value assign
    article.tags = tags;
    article.title = title;
    article.user = await this.userService.findByToken(token);
    article.mdUrl = '';
    article.brief = content.split(/\r\n|\r|\n/).slice(0, 6).join('\n');
    // file save
    article = await this.articleRepository.save(article);
    article.mdUrl = `data/md/${article.user.id}/${article.id}.md`;
    try {
      await saveFile(`data/md/${article.user.id}`, `${article.id}.md`, content);
      return await this.articleRepository.save(article);
    } catch (err) {
      throw new ErrorException(err);
    }
  }

  public async modifyArticle(article: Article, content: string, token: string) {
    const verified = !! await this.articleRepository.findOne({
      where: {
        user: await this.userService.findByToken(token),
        id: article.id,
      },
    });
    if (verified) {
      try {
        // article.updateDate = Timestamp.fromString(new Date().toJSON());
        article.brief = content.split(/\r\n|\r|\n/).slice(0, 6).join('\n');
        await saveFile(`data/md/${article.user.id}`, `${article.id}.md`, content);
        return this.articleRepository.save(article);
      } catch (err) {
        throw new ErrorException(err);
      }
    } else {
      throw new DeniedException();
    }
  }

  public async deleteArticleById(token: string, id: number) {
    const user = await this.userService.findByToken(token);
    const article = await this.articleRepository.findOne({
      where: {
        user,
        id,
      },
    });
    if (article) {
      article.deleted = true;
    }
    return await this.articleRepository.save(article);
  }
}
