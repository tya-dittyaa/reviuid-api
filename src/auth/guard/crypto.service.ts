import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class CryptoService {
  encryptPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  decryptPassword(dataPassword: string, inputPassword: string) {
    const [salt, key] = dataPassword.split(':');
    const hashedBuffer = scryptSync(inputPassword, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    return match;
  }
}
