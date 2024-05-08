import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users Endpoints')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
