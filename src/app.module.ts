import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { winstonLoggerConfig } from 'src/logger/winston-logger';
import { WinstonModule } from 'nest-winston';
import { WinstonLoggerProvider } from 'src/logger/winston.logger.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(winstonLoggerConfig),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, WinstonLoggerProvider],
})
export class AppModule {}
