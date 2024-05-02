import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from './guard/crypto.service';
import { TokenService } from './guard/token.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: configuration().jwt.secret,
      signOptions: {
        expiresIn: configuration().jwt.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, UsersService, TokenService],
  exports: [AuthService, CryptoService],
})
export class AuthModule {}
