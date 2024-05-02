import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UsersService],
})
export class UsersModule {}
