import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportType } from '@prisma/client';
import { HeaderApiKeyGuard } from 'src/common/guards';
import { AddUserReportDto } from './dto/addUserReport.dto';
import { SecurityService } from './security.service';

@ApiTags('Security Endpoints')
@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('check/text')
  @UseGuards(HeaderApiKeyGuard)
  async checkText(@Body('text') text: string) {
    return this.securityService.checkText(text);
  }

  @Get('report/users/list')
  @UseGuards(HeaderApiKeyGuard)
  async reportUsers() {
    return this.securityService.reportUsers();
  }

  @Post('report/users/add')
  @UseGuards(HeaderApiKeyGuard)
  async addUserReport(@Body() dto: AddUserReportDto) {
    return this.securityService.addUserReport(dto);
  }

  @Post('report/users/ignore')
  @UseGuards(HeaderApiKeyGuard)
  async ignoreUserReport(@Body('reportId') reportId: string) {
    return this.securityService.ignoreUserReport(reportId);
  }

  @Post('report/users/action')
  @UseGuards(HeaderApiKeyGuard)
  async actionUserReport(
    @Body('reportId') reportId: string,
    @Body('reportType') reportType: ReportType,
  ) {
    return this.securityService.actionUserReport(reportId, reportType);
  }
}
