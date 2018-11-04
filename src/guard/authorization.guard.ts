import { CanActivate, ExecutionContext, Injectable, RequestMethod, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private userService: UserService,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.userService.findByToken(req.headers.authorization);
    if (user) {
      return true;
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
