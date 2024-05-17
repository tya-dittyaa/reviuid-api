import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthBasicGuard extends AuthGuard('auth-basic') {}
