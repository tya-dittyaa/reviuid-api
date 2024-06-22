import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [UsersModule],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
