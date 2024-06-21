import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HeaderApiKeyGuard } from 'src/common/guards';
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
}
