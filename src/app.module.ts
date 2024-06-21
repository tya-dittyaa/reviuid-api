import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { ForumModule } from './forum/forum.module';
import { PrismaModule } from './prisma/prisma.module';
import { SecurityModule } from './security/security.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    FilmsModule,
    ForumModule,
    SecurityModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
