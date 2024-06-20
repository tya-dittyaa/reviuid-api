import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';

@Module({
  imports: [UsersModule],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
