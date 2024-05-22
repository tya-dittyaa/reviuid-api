import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
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

  async validate(apiKey: string, done: (error: Error, data) => void) {
    try {
      const keyReplace = apiKey.replace('apiKey', '').trim();
      const isValid = keyReplace === this.configService.get('HEADER_API_KEY');

      if (!isValid) {
        return done(new UnauthorizedException(), false);
      }
    } catch (error) {
      return done(new UnauthorizedException(), false);
    }

    return done(null, true);
  }
}
