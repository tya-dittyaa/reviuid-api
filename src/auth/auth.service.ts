import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CryptoService } from './guard/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username: data.username }, { email: data.email }] },
    });

    if (user) throw new ConflictException('Username or Email already exists');

    data.password = this.cryptoService.encryptPassword(data.password);
    await this.prisma.user.create({ data });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = this.cryptoService.decryptPassword(user.password, password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    delete user.username;
    delete user.password;
    delete user.biography;

    return {
      access_token: await this.jwtService.sign(user),
    };
  }

  test() {
    return 'Hello World!';
  }
}
