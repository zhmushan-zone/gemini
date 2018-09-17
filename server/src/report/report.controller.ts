import { Controller, Post, UseGuards, Body, Get, Param, Put } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDTO } from './dto';
import { Usr } from '../user/user.decorators';
import { User } from '../user/user.entity';
import { success, response } from '../common/utils';
import { ReportVO } from './vo/report.vo';
import { ReportType, ReportStatus, Report } from './report.entity';
import { UserService } from '../user/user.service';
import { GeminiError } from '../common/error';

@Controller('/api/reports')
export class ReportController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createReportDTO: CreateReportDTO) {
    const report = await this.reportService.save(user.id.toHexString(), createReportDTO);
    return success(new ReportVO(report));
  }

  @Get()
  async findAll() {
    const reports = await this.reportService.findAll();
    const res = [] as ReportVO[];
    for (const r of reports) {
      const reportVO = new ReportVO(r);
      const reporter = await this.userService.findById(r.reporterId);
      reportVO.reporterUsername = reporter.username;
      res.push(reportVO);
    }
    return success(res);
  }

  @Get('type/:type')
  @UseGuards(AuthGuard('jwt'))
  async findByType(@Param('type') type: ReportType) {
    type = ReportType[ReportType[type]];
    const reports = await this.reportService.findByType(type);
    const res: ReportVO[] = [];
    for (const r of reports) {
      const reporter = await this.userService.findById(r.reporterId);
      const reportVO = new ReportVO(r);
      reportVO.reporterUsername = reporter.username;
      res.push(reportVO);
    }
    return success(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const report = await this.reportService.findById(id);
    const reporter = await this.userService.findById(report.reporterId);
    const res = new ReportVO(report);
    res.reporterUsername = reporter.username;
    return success(res);
  }

  @Put(':id/status/:status')
  @UseGuards(AuthGuard('jwt'))
  async changeStatus(@Param('id') id: string, @Param('status') status: ReportStatus) {
    status = ReportStatus[ReportStatus[status]];
    const res = this.reportService.updateByIdWithAdmin(id, { status } as Report);
    if (res instanceof GeminiError) return response(res.code);
    return success();
  }

  constructor(
    private readonly reportService: ReportService,
    private readonly userService: UserService
  ) { }
}
