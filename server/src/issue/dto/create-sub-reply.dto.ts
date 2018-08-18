import { SubReply } from '../issue.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubReplyDTO extends SubReply {
  @IsNotEmpty() @IsString() readonly content;
  @IsNotEmpty() @IsString() readonly to;
}
