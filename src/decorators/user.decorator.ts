import { createParamDecorator } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export const HeaderValue = createParamDecorator((data, req: any) => {
  return req.headers[data];
});