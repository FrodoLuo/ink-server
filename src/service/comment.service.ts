import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'entity/comment.entity';
import { Repository } from 'typeorm';

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
    });
  }

  public async postComment(author: string, content: string) {
    const comment = this.commentRepository.create();
    comment.author = author;
    comment.content = content;
    return this.commentRepository.save(comment);
  }
}
