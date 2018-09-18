import { Notice, NoticeType } from '../notice.entity';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateNoticeDTO extends Notice {
  @IsEnum(NoticeType) readonly type;
  @IsString() @IsNotEmpty() readonly srcId;
  @IsString() readonly reason;
}
