import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalBasicGuard extends AuthGuard('basic-local') {}
