import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { winstonLoggerConfig } from 'src/logger/winston-logger';
import { WinstonModule } from 'nest-winston';
import { WinstonLoggerProvider } from 'src/logger/winston.logger.provider';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerConfig), MailerModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, WinstonLoggerProvider],
  exports: [UsersService],
})
export class UsersModule {}
