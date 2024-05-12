import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadData } from 'src/common/types';

export const User = createParamDecorator(
  (data: keyof JwtPayloadData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayloadData;
    return data ? user[data] : user;
  },
);
