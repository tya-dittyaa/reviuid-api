import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, FilmsModule],
  providers: [],
})
export class AppModule {}
