import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDTO } from './dto';
import { Usr } from '../user/user.decorators';
import { User } from '../user/user.entity';
import { success } from '../common/utils';
import { ReportVO } from './vo/report.vo';
import { ReportType } from './report.entity';
import { UserService } from '../user/user.service';

@Controller('/api/reports')
export class ReportController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createReportDTO: CreateReportDTO) {
    const report = await this.reportService.save(user.id.toHexString(), createReportDTO);
    return success(new ReportVO(report));
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
    return success(new ReportVO(report));
  }

  constructor(
    private readonly reportService: ReportService,
    private readonly userService: UserService
  ) { }
}
