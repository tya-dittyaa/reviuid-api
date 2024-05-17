import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { BasicStrategy } from 'passport-http';

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(
  BasicStrategy,
  'auth-basic',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const validUsername = this.configService.get<string>('BASIC_AUTH_USERNAME');
    const validPassword = this.configService.get<string>('BASIC_AUTH_PASSWORD');

    // Decode the base64 encoded credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [decodedUsername, decodedPassword] = credentials.split(':');

    // Get username and password from the decoded credentials
    const username = Buffer.from(decodedUsername, 'base64').toString('utf-8');
    const password = Buffer.from(decodedPassword, 'base64').toString('utf-8');

    // Check if the provided credentials are valid
    if (username === validUsername && password === validPassword) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
