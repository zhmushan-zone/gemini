import { Issue } from '../issue.entity';
import { IsString, IsNotEmpty, ArrayNotEmpty, IsEnum } from 'class-validator';
import { WatchTag } from '../../user/user.entity';
export class UpdateIssueDTO extends Issue {
  @IsNotEmpty() @IsString() readonly title;
  @IsNotEmpty() @IsString() readonly content;
  @ArrayNotEmpty() @IsEnum(WatchTag, { each: true }) readonly tags;
}

