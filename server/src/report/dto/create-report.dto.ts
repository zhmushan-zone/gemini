import { Report, ReportType, ReportReason } from '../report.entity';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateReportDTO extends Report {
  @IsNotEmpty() @IsString() readonly srcId;
  @IsNotEmpty() @IsString() readonly msg;
  @IsEnum(ReportType) readonly type;
  @IsEnum(ReportReason) readonly reason;
}
