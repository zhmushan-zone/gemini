import { Get, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { NoticeGateway } from './notice.gateway';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { User } from '../user/user.entity';
import { CreateNoticeDTO } from './dto';
import { NoticeService } from './notice.service';
import { success, response } from '../common/utils';
import { GeminiError } from '../common/error';

@Controller('/api/notices')
export class NoticeController {
  constructor(
    private readonly noticeGateway: NoticeGateway,
    private readonly noticeService: NoticeService
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createNoticeDTO: CreateNoticeDTO) {
    createNoticeDTO.from = user.id.toHexString();
    const doc = await this.noticeService.save(createNoticeDTO);
    if (doc instanceof GeminiError) return response(doc.code);
    this.noticeGateway.notice(user.id.toHexString(), doc);
    return success();
  }
}
