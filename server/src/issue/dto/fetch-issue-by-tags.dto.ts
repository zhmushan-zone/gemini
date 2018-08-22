import { Issue } from '../issue.entity';
import { ArrayNotEmpty, IsEnum } from 'class-validator';
import { WatchTag } from '../../user/user.entity';

export class FetchIssueByTagsDTO extends Issue {
  @ArrayNotEmpty() @IsEnum(WatchTag, { each: true }) readonly tags: WatchTag[];
}
