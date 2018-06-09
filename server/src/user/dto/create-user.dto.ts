import { IsString, IsEmail } from 'class-validator';
import { User } from '../user.entity';

export class CreateUserDTO extends User {
  @IsString() readonly username;
  @IsEmail() readonly email;
  @IsString() readonly password;
}
