import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from './guard/crypto.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: configuration().jwt.secret,
      signOptions: {
        expiresIn: configuration().jwt.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, UsersService],
})
export class AuthModule {}
