import { Get, Controller, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { puts } from 'util';

@Controller('/hello')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/get/:id')
  root(@Param() id): string {
    console.log(id);
    return this.appService.root();
  }

  @Put('/put/:id')
  puts(@Param() id): string {
    console.log('put');
    return 'rua!';
  }
}

@Controller('/articles')
export class ArticlesController {
  constructor() { }

  @Get('')
  getArticles() {
    return [
      {
        author: {
          avatarURL: '/assets/img/Holo.full.191598.jpg',
          name: 'frodoluo',
        },
        comments: 0,
        contentUrl: 'http://www.frodoluo.ink/article/0',
        id: 0,
        title: 'This Is The Title Of An Article',
        updateDate: new Date(),
      }, {
        author: {
          avatarURL: '/assets/img/Holo.full.191598.jpg',
          name: 'frodoluo',
        },
        comments: 0,
        contentUrl: 'http://www.frodoluo.ink/article/0',
        id: 1,
        title: 'This Is The Title Of An Article',
        updateDate: new Date(),
      },
    ];
  }
}