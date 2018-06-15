import {IsString, IsEmail, ValidateIf} from 'class-validator';
import {User} from '../user.entity';

export class CheckUserDTO extends User {

  @ValidateIf(user => !user.hasOwnProperty('email'))
  @IsString()
  readonly username;

  @ValidateIf(user => !user.hasOwnProperty('username'))
  @IsEmail()
  readonly email;
}
