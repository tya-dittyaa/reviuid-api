import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
