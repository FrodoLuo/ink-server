import { HttpException } from '@nestjs/common';

export class DeniedException extends HttpException {
  constructor() {
    super({
      message: 'denied',
    }, 401);
  }
}

export class ErrorException extends HttpException {
  constructor(err: any) {
    console.log(err);
    super({
      message: err.toString(),
    }, 500);
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super({
      message: 'not found',
    }, 404);
  }
}