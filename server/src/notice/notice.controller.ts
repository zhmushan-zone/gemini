import { Get, Controller, Post, UseGuards, Body, Param, Put } from '@nestjs/common';
import { NoticeGateway } from './notice.gateway';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { User } from '../user/user.entity';
import { CreateNoticeDTO } from './dto';
import { NoticeService } from './notice.service';
import { success, response, ResponseCode } from '../common/utils';
import { GeminiError } from '../common/error';

@Controller('/api/notices')
export class NoticeController {
  constructor(
    private readonly noticeGateway: NoticeGateway,
    private readonly noticeService: NoticeService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Usr() user: User) {
    const notices = await this.noticeService.findByTo(user.id.toHexString());
    return success(notices);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createNoticeDTO: CreateNoticeDTO) {
    createNoticeDTO.from = user.id.toHexString();
    const doc = await this.noticeService.save(createNoticeDTO);
    if (doc instanceof GeminiError) return response(doc.code);
    this.noticeGateway.notice(doc.to, doc);
    return success();
  }

  @Put('read/:id')
  @UseGuards(AuthGuard('jwt'))
  async readOne(@Usr() user: User, @Param('id') id: string) {
    const notice = await this.noticeService.findById(id);
    if (!(notice.to === user.id.toHexString())) return response(ResponseCode.NOT_YOUR_NOTICE);
    notice.isRead = true;
    const doc = await this.noticeService.save(notice);
    if (doc instanceof GeminiError) return response(doc.code);
    return success();
  }
}
