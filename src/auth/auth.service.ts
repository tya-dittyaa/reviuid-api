import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scryptSync, timingSafeEqual } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = this.decryptPassword(user.password, password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    delete user.password;
    delete user.biography;

    return {
      access_token: await this.jwtService.sign(user),
    };
  }

  private decryptPassword(dataPassword: string, inputPassword: string) {
    const [salt, key] = dataPassword.split(':');
    const hashedBuffer = scryptSync(inputPassword, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    return match;
  }
}
