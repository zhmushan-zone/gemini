import { Controller, Post, UseGuards, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { User } from '../user/user.entity';
import { CreateIssueDTO } from './dto/create-issue.dto';
import { IssueService } from './issue.service';
import { IssueVO } from './vo/issue.vo';
import { success, response, ResponseCode } from '../common/utils/response.util';
import { UpdateIssueDTO } from './dto/update-issue.dto';
import { ObjectId } from 'mongodb';
import { CreateReplyDTO } from './dto/create-reply.dto';
import { GeminiError } from '../common/error';
import { ReplyVO } from './vo/reply.vo';
import { CreateSubReplyDTO } from './dto/create-sub-reply.dto';
import { Issue, Reply } from './issue.entity';
import { SubReplyVO } from './vo/sub-reply.vo';

@Controller('/api/issues')
export class IssueController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createIssueDTO: CreateIssueDTO) {
    const issue = await this.issueService.save(user.id.toHexString(), createIssueDTO);
    return success(new IssueVO(issue));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id: string) {
    this.issueService.delete(user.id.toHexString(), id);
    return success();
  }

  @Get()
  async findAll() {
    const issues = await this.issueService.findAll();
    return success(issues.map(issue => new IssueVO(issue)));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const issue = await this.issueService.findById(id);
    return success(new IssueVO(issue));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateOne(
    @Usr() user: User,
    @Body() updateIssueDTO: UpdateIssueDTO,
    @Param('id') id: string
  ) {
    const res = await this.issueService.updateById(user.id.toHexString(), id, updateIssueDTO);
    if (res instanceof GeminiError) return response(res.code);
    return success(new IssueVO(res));
  }

  @Put(':id/watch')
  @UseGuards(AuthGuard('jwt'))
  async watch(@Usr() user: User, @Param('id') id: string) {
    const issue = await this.issueService.findById(id);
    if (!issue) return response(ResponseCode.NOT_EXISIT);
    const index = issue.watchersId.findIndex(v => v === user.id.toHexString());
    if (index === -1) {
      issue.watchersId.push(user.id.toHexString());
    } else {
      issue.watchersId.splice(index, 1);
    }
    const res = this.issueService.updateById(issue.authorId, id, { watchersId: issue.watchersId } as Issue);
    if (res instanceof GeminiError) return response(res.code);
    return success();
  }

  @Post(':id/reply')
  @UseGuards(AuthGuard('jwt'))
  async createReply(
    @Usr() user: User,
    @Body() createReplyDTO: CreateReplyDTO,
    @Param('id') id: string
  ) {
    const issue = await this.issueService.findById(id);
    if (!issue) return response(ResponseCode.NOT_EXISIT);
    const reply = await this.issueService.createReply(user.id.toHexString(), createReplyDTO);
    if (!reply) return response(ResponseCode.UNKNOWN);
    issue.replysId.push(reply.id.toHexString());
    const res = await this.issueService.updateById(issue.authorId, id, { replysId: issue.replysId } as Issue);
    if (res instanceof GeminiError) return response(res.code);
    return success(new ReplyVO(reply));
  }

  @Post('reply/:id/subreply')
  @UseGuards(AuthGuard('jwt'))
  async createSubReply(
    @Usr() user: User,
    @Body() createSubReplyDTO: CreateSubReplyDTO,
    @Param('id') id: string
  ) {
    const reply = await this.issueService.findReplyById(id);
    if (!reply) return response(ResponseCode.NOT_EXISIT);
    const subreply = await this.issueService.createSubReply(user.id.toHexString(), createSubReplyDTO);
    if (!subreply) return response(ResponseCode.UNKNOWN);
    reply.subReplysId.push(subreply.id.toHexString());
    const res = await this.issueService.updateReplyById(reply.authorId, id, { subReplysId: reply.subReplysId } as Reply);
    if (res instanceof GeminiError) return response(res.code);
    return success(new SubReplyVO(subreply));
  }

  @Post('reply/ids')
  async findReplyGroup(@Body() ids: string[]) {
    const replys = await this.issueService.findReplysById(ids.map(id => new ObjectId(id)));
    return success(replys.map(r => new ReplyVO(r)));
  }

  @Post('reply/subreply/ids')
  async findSubReplyGroup(@Body() ids: string[]) {
    const subreplys = await this.issueService.findSubReplysById(ids.map(id => new ObjectId(id)));
    return success(subreplys.map(s => new SubReplyVO(s)));
  }

  @Put('reply/:id/up')
  @UseGuards(AuthGuard('jwt'))
  async replyUp(@Usr() user: User, @Param('id') id: string) {
    const reply = await this.issueService.findReplyById(id);
    if (!reply) return response(ResponseCode.NOT_EXISIT);
    if (reply.downersId.findIndex(v => v === user.id.toHexString()) !== -1) return response(ResponseCode.REPEAT_OPERATION);
    const index = reply.upersId.findIndex(v => v === user.id.toHexString());
    if (index === -1) {
      reply.upersId.push(user.id.toHexString());
    } else {
      reply.upersId.splice(index, 1);
    }
    const res = await this.issueService.updateReplyById(reply.authorId, id, { upersId: reply.upersId } as Reply);
    if (res instanceof GeminiError) return response(res.code);
    return success();
  }

  @Put('reply/:id/down')
  @UseGuards(AuthGuard('jwt'))
  async replyDown(@Usr() user: User, @Param('id') id: string) {
    const reply = await this.issueService.findReplyById(id);
    if (!reply) return response(ResponseCode.NOT_EXISIT);
    if (reply.upersId.findIndex(v => v === user.id.toHexString()) !== -1) return response(ResponseCode.REPEAT_OPERATION);
    const index = reply.downersId.findIndex(v => v === user.id.toHexString());
    if (index === -1) {
      reply.downersId.push(user.id.toHexString());
    } else {
      reply.downersId.splice(index, 1);
    }
    const res = await this.issueService.updateReplyById(reply.authorId, id, { downersId: reply.downersId } as Reply);
    if (res instanceof GeminiError) return response(res.code);
    return success();
  }

  constructor(
    private readonly issueService: IssueService
  ) { }
}
