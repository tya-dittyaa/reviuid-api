import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { hash, verify } from 'argon2';
import { randomInt } from 'crypto';
import { createTransport } from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayloadCreate } from '../common/types';
import { SigninDto, SignupDto, VerifyOtpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  mailTransport() {
    return createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    });
  }

  async signUp(dto: SignupDto) {
    // check if email exists
    const emailExists = await this.usersService.findByEmail(dto.email);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    // check if username exists
    const usernameExists = await this.usersService.findByUsername(dto.username);
    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }

    // if registering as admin, check if admin password is correct
    if (dto.isAdmin === 'true') {
      if (!dto.adminPassword) {
        throw new BadRequestException('Admin password is required');
      }
      if (dto.adminPassword !== process.env.ADMIN_PASSWORD) {
        throw new BadRequestException('Invalid admin password');
      }
    }

    // hash password
    const hashPassword = await hash(dto.password);

    // create user
    const newUser = await this.usersService.create({
      email: dto.email,
      password: hashPassword,
      username: dto.username,
      role: dto.isAdmin === 'true' ? 'ADMIN' : 'USER',
    });

    // token
    const tokens = await this.getUserTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(dto: SigninDto) {
    // check if user exists
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // check if password is correct
    const passwordMatch = await verify(user.password, dto.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    // token
    const tokens = await this.getUserTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signOut(userId: string) {
    // check if user exists
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    // remove refresh token
    await this.usersService.update(userId, {
      refreshToken: null,
    });
  }

  async refreshUserTokens(userId: string, refreshToken: string) {
    // check if user exists
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    // check if refresh token is valid
    const isValid = await verify(user.refreshToken, refreshToken);
    if (!isValid) {
      throw new ForbiddenException('Access denied');
    }

    // token
    const tokens = await this.getUserTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async sendOtp(email: string) {
    // check if email exists
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // check if user exists
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    // check if otp already exists
    const checkOtp = await this.prisma.emailVerification.findUnique({
      where: {
        email,
      },
    });
    if (
      checkOtp &&
      checkOtp.updatedAt.getTime() + 5 * 60 * 1000 > new Date().getTime()
    ) {
      throw new BadRequestException('OTP already sent');
    }

    // send otp
    try {
      const transporter = this.mailTransport();
      const otpCode = randomInt(100000, 999999).toString();
      const otpHash = await hash(otpCode);

      await this.prisma.emailVerification.upsert({
        where: {
          email,
        },
        update: {
          token: otpHash,
        },
        create: {
          email,
          token: otpHash,
        },
      });

      await await transporter.sendMail({
        from: `"No Reply - Reviu.ID App" <${process.env.EMAIL_HOST_USER}>`,
        to: email,
        subject: 'Verifikasi OTP',
        html: `Terima kasih telah menggunakan aplikasi Reviu.ID</br>Berikut adalah kode OTP Anda: <b>${otpCode}</b>`,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to send OTP');
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    // check if user exists
    const user = await this.usersService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    // check if otp exists
    const otp = await this.prisma.emailVerification.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!otp) {
      throw new BadRequestException('User not found');
    }

    // check if otp is valid
    const isValid = await verify(otp.token, dto.otp);

    if (!isValid) {
      throw new BadRequestException('Invalid OTP');
    }

    // delete otp
    await this.prisma.emailVerification.delete({
      where: {
        email: dto.email,
      },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getUserTokens(user: Users) {
    const jwtPayload: JwtPayloadCreate = {
      sub: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
