import { createParamDecorator } from '@nestjs/common';

export const HeaderValue = createParamDecorator((data, req: any) => {
  return req.headers[data];
});