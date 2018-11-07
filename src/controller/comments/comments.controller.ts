import { Controller, Get, Post, Query, HttpCode, Body } from '@nestjs/common';
import { CommentService } from '../../service/comment.service';

@Controller('comments')
export class CommentsController {

  constructor(
    private commentService: CommentService,
  ) { }

  @Get()
  public async getComments(@Query('page') page: number) {
    return await this.commentService.getComments(page);
  }

  @Post()
  @HttpCode(200)
  public async postComment(@Body('author') author: string, @Body('content') content: string) {
    return await this.commentService.postComment(author, content);
  }
}
