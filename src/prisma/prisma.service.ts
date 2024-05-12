import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasourceUrl: process.env.DATABASE_URL,
    });
  }

  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect()
      .then(() => {
        this.logger.log('Database connected');
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }

  async onModuleDestroy() {
    await this.$disconnect()
      .then(() => {
        this.logger.log('Database disconnected');
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }
}
