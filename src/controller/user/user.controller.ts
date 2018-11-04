import { Controller, Post, Param, Put, Body, Get, Header, Req, HttpCode } from '@nestjs/common';
import { UserService } from 'service/user.service';
import { HeaderValue } from 'decorators/user.decorator';
import { User } from 'entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }
  @Post()
  @HttpCode(200)
  async login(@Body('userName') userName: string, @Body('password') password: string) {
    return this.userService.login(userName, password);
  }
  @Put()
  async signUp(@Body('userName') userName: string, @Body('password') password: string) {
    return this.userService.signUp(userName, password);
  }
  @Get()
  async getUser(@HeaderValue('authorization') token: string) {
    return this.userService.findByToken(token);
  }
}
