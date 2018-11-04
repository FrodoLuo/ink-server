import { Controller, Get, Query } from '@nestjs/common';

@Controller('comments')
export class CommentsController {

  @Get()
  getComments(@Query() articleId: number) {
    return [
      {
        author: {
          avatarURL: '/assets/img/Holo.full.191598.jpg',
          name: 'frodoluo',
        },
        content: 'This is a comment',
        updateDate: new Date(),
      },
    ];
  }
}
