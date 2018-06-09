import { createParamDecorator } from '@nestjs/common';

export const Usr = createParamDecorator((data, req) => req.user);
