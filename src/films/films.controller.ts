import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilmsService } from './films.service';

@ApiTags('Films Endpoints')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
}
