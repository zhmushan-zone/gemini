import { Controller, Post, UseGuards, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { User, UserRole } from '../user/user.entity';
import { IssueService } from './issue.service';
import { success, response, ResponseCode } from '../common/utils/response.util';
import { ObjectId } from 'mongodb';
import { GeminiError } from '../common/error';
import { Issue, Reply, IssueStatus } from './issue.entity';
import { UserService } from '../user/user.service';
import { CreateIssueDTO, UpdateIssueDTO, CreateReplyDTO, CreateSubReplyDTO, FetchIssueByTagsDTO } from './dto';
import { IssueVO, ReplyVO, SubReplyVO } from './vo';
import { Common } from '../common/common.entity';

@Controller('/api/issues')
export class IssueController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createIssueDTO: CreateIssueDTO) {
    const issue = await this.issueService.save(user.id.toHexString(), createIssueDTO);
    return success(new IssueVO(issue));
  }

  @Post('fetch/by-tag/intersect')
  async findByTag(@Body() fetchIssueByTagsDTO: FetchIssueByTagsDTO) {
    const issues = await this.issueService.findAll();
    return success(issues.filter(
      issue =>
        (issue.tags.length + fetchIssueByTagsDTO.tags.length) !==
        new Set([...issue.tags, ...fetchIssueByTagsDTO.tags]).size
    ).map(issue => new IssueVO(issue)));
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
    const reply = await this.issueService.createReply(user.id.toHexString(), createReplyDTO, issue.id.toHexString());
    if (!reply) return response(ResponseCode.UNKNOWN);
    issue.replysId.push(reply.id.toHexString());
    const res = await this.issueService.updateById(issue.authorId, id, { replysId: issue.replysId } as Issue);
    if (res instanceof GeminiError) return response(res.code);

    this.commonEntity.increaseIssueReplyNum(user.id.toHexString());

    return success({
      ...new ReplyVO(reply),
      authorUsername: user.username,
      authorAvatar: user.avatar
    } as ReplyVO);
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
    const to = await this.userService.findById(createSubReplyDTO.to);
    return success({
      ...new SubReplyVO(subreply),
      fromUsername: user.username,
      fromAvatar: user.avatar,
      toUsername: to.username,
      toAvatar: to.avatar
    } as SubReplyVO);
  }

  @Post('reply/ids')
  async findReplyGroup(@Body() ids: string[]) {
    const replys = await this.issueService.findReplyByIds(ids.map(id => new ObjectId(id)));
    const res: ReplyVO[] = [];
    for (const r of replys) {
      const author = await this.userService.findById(r.authorId);
      res.push({
        ...new ReplyVO(r),
        authorUsername: author.username,
        authorAvatar: author.avatar
      } as ReplyVO);
    }
    return success(res);
  }

  @Post('reply/subreply/ids')
  async findSubReplyGroup(@Body() ids: string[]) {
    const subreplys = await this.issueService.findSubReplyByIds(ids.map(id => new ObjectId(id)));
    const res: SubReplyVO[] = [];
    for (const s of subreplys) {
      const from = await this.userService.findById(s.from);
      const to = await this.userService.findById(s.to);
      res.push({
        ...new SubReplyVO(s),
        fromUsername: from.username,
        fromAvatar: from.avatar,
        toUsername: to.username,
        toAvatar: to.avatar
      } as SubReplyVO);
    }
    return success(res);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id: string) {
    if (user.role === UserRole.ADMIN) {
      this.issueService.remove([id]);
    } else {
      this.issueService.delete(user.id.toHexString(), id);
    }
    return success();
  }

  @Delete('reply/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteReply(@Usr() user: User, @Param('id') id: string) {
    if (user.role === UserRole.ADMIN) {
      await this.issueService.removeReplys([id]);
    } else {
      await this.issueService.deleteReply(user.id.toHexString(), id);
    }
    return success();
  }

  @Delete('subreply/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteSubReply(@Usr() user: User, @Param('id') id: string) {
    if (user.role === UserRole.ADMIN) {
      this.issueService.removeSubReplys([id]);
    } else {
      this.issueService.deleteSubReply(user.id.toHexString(), id);
    }
    return success();
  }

  @Get()
  async findAll() {
    const issues = await this.issueService.findAll();
    const res = [] as IssueVO[];
    for (const i of issues) {
      const author = await this.userService.findById(i.authorId);
      const issueVO = new IssueVO(i);
      issueVO.authorUsername = author.username;
      issueVO.authorAvatar = author.avatar;
      res.push(issueVO);
    }
    return success(res);
  }

  @Get('reply-num-weekly')
  async issueReplyNumWeekly() {
    const commonData = await this.commonEntity.get();
    return success(commonData.issueReplyNumWeekly);
  }

  @Get('reply-num-totally')
  async issueReplyNumTotally() {
    const commonData = await this.commonEntity.get();
    return success(commonData.issueReplyNumTotally);
  }

  @Get('tags/:tag/user-approved-num')
  async userApprovedNum(@Param('tag') tag) {
    const commonData = await this.commonEntity.get();
    return success(commonData.userApprovedNumByTags[tag] || {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const issue = await this.issueService.findById(id);
    if (!issue) return response(ResponseCode.NOT_EXISIT);
    const author = await this.userService.findById(issue.authorId);
    issue.viewnum++;
    this.issueService.updateByIdWithoutUpdateDate(id, { viewnum: issue.viewnum } as Issue);
    const issueVO = new IssueVO(issue);
    issueVO.authorUsername = author.username;
    issueVO.authorAvatar = author.avatar;
    return success(issueVO);
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
    const index = user.watchIssuesId.findIndex(v => v === id);
    if (index === -1) {
      user.watchIssuesId.push(id);
      issue.watchersId.push(user.id.toHexString());
    } else {
      user.watchIssuesId.splice(index, 1);
      issue.watchersId.splice(issue.watchersId.findIndex(v => v === user.id.toHexString()), 1);
    }
    const res = this.userService.updateById(user.id.toHexString(), { watchIssuesId: user.watchIssuesId } as User);
    if (res instanceof GeminiError) return response(res.code);
    this.issueService.updateByIdWithoutUpdateDate(id, { watchersId: issue.watchersId } as Issue);
    return success(user.watchIssuesId);
  }

  @Put(':id/status/:status')
  @UseGuards(AuthGuard('jwt'))
  async changeStatus(@Param('id') id: string, @Param('status') status: IssueStatus) {
    status = IssueStatus[IssueStatus[status]];
    const res = this.issueService.updateByIdWithAdmin(id, { status } as Issue);
    if (res instanceof GeminiError) return response(res.code);
    return success();
  }

  @Put('reply/:id/up')
  @UseGuards(AuthGuard('jwt'))
  async replyUp(@Usr() user: User, @Param('id') id: string) {
    const reply = await this.issueService.findReplyById(id);
    if (!reply) return response(ResponseCode.NOT_EXISIT);
    if (reply.downersId.findIndex(v => v === user.id.toHexString()) !== -1) return response(ResponseCode.REPEAT_OPERATION);
    const issue = await this.issueService.findById(reply.issueId);
    if (!issue) return response(ResponseCode.NOT_EXISIT);
    const index = reply.upersId.findIndex(v => v === user.id.toHexString());
    if (index === -1) {
      reply.upersId.push(user.id.toHexString());
      this.commonEntity.increaseUserApprovedNumByTags(issue.tags, reply.authorId);
    } else {
      reply.upersId.splice(index, 1);
      this.commonEntity.decreaseUserApprovedNumByTags(issue.tags, reply.authorId);
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
    private readonly issueService: IssueService,
    private readonly userService: UserService,
    private readonly commonEntity: Common
  ) { }
}
