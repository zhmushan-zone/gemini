import { IsString, IsEnum } from 'class-validator';
import { User, Sex } from '../user.entity';

export class UpdateUserDTO extends User {
  @IsString() readonly nickname;
  @IsString() readonly job;
  @IsString() readonly city;
  @IsEnum(Sex) readonly sex;
  @IsString() readonly signature;
}
