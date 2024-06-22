import { ReportType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AddUserReportDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  reportId: string;

  @IsNotEmpty()
  @IsEnum(ReportType)
  reportType: ReportType;

  @IsNotEmpty()
  @IsString()
  reportContent: string;
}
