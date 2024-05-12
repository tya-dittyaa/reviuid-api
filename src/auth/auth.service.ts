import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { hash, verify } from 'argon2';
import { UsersService } from 'src/users/users.service';
import { JwtPayloadCreate } from '../common/types';
import { SigninDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

    // hash password
    const hashPassword = await hash(dto.password);

    // create user
    const newUser = await this.usersService.create({
      ...dto,
      password: hashPassword,
    });

    // token
    const tokens = await this.getTokens(newUser);
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
    const tokens = await this.getTokens(user);
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

  async refreshTokens(userId: string, refreshToken: string) {
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
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(user: Users) {
    const jwtPayload: JwtPayloadCreate = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
