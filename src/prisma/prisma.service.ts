import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
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

  async onModuleInit() {
    await this.$disconnect()
      .then(() => {
        console.log('Database connected');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async onModuleDestroy() {
    await this.$connect()
      .then(() => {
        console.log('Database disconnected');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
