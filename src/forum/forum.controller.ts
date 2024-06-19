import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Forum Endpoints')
@Controller('forum')
export class ForumController {}
