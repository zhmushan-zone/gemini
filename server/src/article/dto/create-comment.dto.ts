import { Comment } from '../article.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO extends Comment {
  @IsNotEmpty() @IsString() readonly content;
  @IsString() readonly to;
}
