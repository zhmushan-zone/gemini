import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDTO } from './dto';
import { Usr } from '../user/user.decorators';
import { User } from '../user/user.entity';
import { success } from '../common/utils';
import { ReportVO } from './vo/report.vo';

@Controller()
export class ReportController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createReportDTO: CreateReportDTO) {
    const report = await this.reportService.save(user.id.toHexString(), createReportDTO);
    return success(new ReportVO(report));
  }

  constructor(
    private readonly reportService: ReportService
  ) {}
}
