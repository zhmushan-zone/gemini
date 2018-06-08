import { IsString, IsEmail } from 'class-validator';
import { User } from '../user.entity';

export class CheckUserDTO extends User {
  @IsString() readonly username;
  @IsEmail() readonly email;
}
