import { Controller, Post, UseGuards, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { User } from '../user/user.entity';
import { CreateIssueDTO } from './dto/create-issue.dto';
import { IssueService } from './issue.service';
import { IssueVO } from './vo/issue.vo';
import { success } from '../common/utils/response.util';
import { UpdateIssueDTO } from './dto/update-issue.dto';

@Controller('/api/issues')
export class IssueController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createIssueDTO: CreateIssueDTO) {
    const issue = await this.issueService.save(user.id, createIssueDTO);
    return success(new IssueVO(issue));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id) {
    this.issueService.delete(user.id, id);
    return success();
  }

  @Get()
  async findAll() {
    const issues = await this.issueService.findAll();
    return success(issues.map(issue => new IssueVO(issue)));
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const issue = await this.issueService.findById(id);
    return success(new IssueVO(issue));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateOne(@Usr() user, @Body() updateIssueDTO: UpdateIssueDTO, @Param('id') id) {
    const res = await this.issueService.updateById(id, updateIssueDTO);
    return success();
  }

  constructor(
    private readonly issueService: IssueService
  ) {}
}
