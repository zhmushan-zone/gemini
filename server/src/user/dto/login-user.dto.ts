import { IsString } from 'class-validator';
import { User } from '../user.entity';

export class LoginUserDTO extends User {
  @IsString() readonly username;
  @IsString() readonly password;
}
