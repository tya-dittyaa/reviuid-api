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
import { TokenService } from './guard/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
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

    const getUserToken = await this.tokenService.getTokenFromDatabase(user.id);
    if (getUserToken) return { access_token: getUserToken.token };

    delete user.username;
    delete user.password;
    delete user.biography;

    const access_token: string = await this.jwtService.signAsync(user);
    await this.tokenService.addTokenToDatabase(user.id, access_token);

    return { access_token };
  }

  test() {
    return 'Hello World!';
  }
}
