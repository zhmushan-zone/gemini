import { ReflectMetadata } from '@nestjs/common';
import { UserRole } from './user.entity';

export const Allow = (...roles: UserRole[]) => ReflectMetadata('roles', roles);
