import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('WinstonLogger') private readonly logger: winston.Logger,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.logger.info('Creating a new user', { createUserDto });
    return `this is create user`;
  }

  findAll() {
    this.logger.info('Finding all users');
    return 'okokok';
  }

  findOne(id: number) {
    this.logger.debug(`Finding user with id: ${id}`);
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.info(`Updating user with id: ${id}`, { updateUserDto });
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.logger.warn(`Removing user with id: ${id}`);
    return `This action removes a #${id} user`;
  }
}
