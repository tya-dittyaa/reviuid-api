import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { scryptSync, timingSafeEqual } from 'crypto';
import Strategy from 'passport-headerapikey';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  constructor(private readonly configService: ConfigService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  validate(apiKey: string, done: (error: Error, data) => void) {
    try {
      const isValid = this.decryptApiKey(apiKey);

      if (!isValid) {
        return done(new UnauthorizedException(), false);
      }
    } catch (error) {
      return done(new UnauthorizedException(), false);
    }

    return done(null, true);
  }

  decryptApiKey(apiKey: string) {
    const headerApiKey = this.configService.get('HEADER_API_KEY');

    const [salt, key] = apiKey.split(':');
    const hashedBuffer = scryptSync(headerApiKey, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    return match;
  }
}
