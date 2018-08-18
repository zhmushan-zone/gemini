import { Reply } from '../issue.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyDTO extends Reply {
  @IsNotEmpty() @IsString() readonly content;
}
