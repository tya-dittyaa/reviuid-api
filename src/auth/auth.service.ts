import { Injectable, UnauthorizedException } from '@nestjs/common';
import { scryptSync, timingSafeEqual } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = this.decryptPassword(user.password, password);
    if (!match) throw new UnauthorizedException('Invalid email or password');
  }

  private decryptPassword(dataPassword: string, inputPassword: string) {
    const [salt, key] = dataPassword.split(':');
    const hashedBuffer = scryptSync(inputPassword, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    return match;
  }
}
