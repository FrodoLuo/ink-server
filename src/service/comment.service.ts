import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }

  public async getComments(page: number) {
    return await this.commentRepository.find({
      skip: page * 10,
      take: 10,
      order: {
        updateDate: 'DESC',
      },
    });
  }

  public async postComment(author: string, content: string) {
    const comment = this.commentRepository.create();
    comment.author = author;
    comment.content = content;
    return this.commentRepository.save(comment);
  }
}
