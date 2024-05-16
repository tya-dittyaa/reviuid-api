import { Module } from '@nestjs/common';
import { FilmsModule } from 'src/films/films.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [FilmsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
