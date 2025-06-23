import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import * as winston from 'winston';
import aqp from 'api-query-params';
import { hashPassword } from 'src/helpers/bcrypt-password';
import { RegisterUserDto } from 'src/auth/dto/register.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { CodeAuthDto, RetryDto } from 'src/auth/dto/code.auth.dto';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('WinstonLogger') private readonly logger: winston.Logger,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const checkEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (checkEmail) {
        throw new BadRequestException('Email already exists');
      }
      const { password, ...userData } = createUserDto;
      const hashedPassword = (await hashPassword(password)) || '';
      const user = await this.prisma.user.create({
        data: {
          password: hashedPassword,
          ...userData,
        } as any,
      });
      this.logger.info('Creating a new user', { createUserDto });
      return user;
    } catch (error) {
      this.logger.error('Error creating user', { error: error.message });
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(query: any, page: number, limit: number) {
    try {
      const { filter, sort } = aqp(query);
      delete filter.page;
      delete filter.limit;

      const prismaWhere: any = {};

      if (filter.email && typeof filter.email === 'string') {
        prismaWhere.email = { contains: filter.email, mode: 'insensitive' };
      }

      if (filter.name && typeof filter.name === 'string') {
        prismaWhere.name = { contains: filter.name, mode: 'insensitive' };
      }

      // Handle other filter properties
      Object.keys(filter).forEach((key) => {
        if (!['email', 'name'].includes(key)) {
          prismaWhere[key] = filter[key];
        }
      });

      const users = await this.prisma.user.findMany({
        where: prismaWhere,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort as any,
      });

      const total = await this.prisma.user.count({ where: prismaWhere });
      return {
        users,
        total,
        totalPages: Math.ceil(total / limit),
        pageCurrent: page,
      };
    } catch (error) {
      this.logger.error('Error finding users:', { error: error.message });
      throw new InternalServerErrorException('Error finding users');
    }
  }

  async findOne(id: number) {
    try {
      this.logger.info(`Finding user with id: ${id}`);
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      this.logger.error(`Error finding user with id ${id}:`, {
        error: error.message,
      });
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error finding user with id ${id}`,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      this.logger.info(`Updating user with id: ${id}`, { updateUserDto });

      await this.findOne(id);

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user with id ${id}:`, {
        error: error.message,
      });
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating user with id ${id}`,
      );
    }
  }

  async remove(id: number) {
    try {
      this.logger.info(`Removing user with id: ${id}`);

      await this.findOne(id);

      await this.prisma.user.delete({
        where: { id },
      });

      return { message: `User with id ${id} has been successfully removed` };
    } catch (error) {
      this.logger.error(`Error removing user with id ${id}:`, {
        error: error.message,
      });
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error removing user with id ${id}`,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      this.logger.info(`Finding user with email: ${email}`);
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      this.logger.error(`Error finding user with email ${email}:`, {
        error: error.message,
      });
      throw new InternalServerErrorException(
        `Error finding user with email ${email}`,
      );
    }
  }

  async getUserByEmail(email: string) {
    try {
      this.logger.info(`Getting user with email: ${email}`);
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      });
      return user;
    } catch (error) {
      this.logger.error(`Error getting user with email ${email}:`, {
        error: error.message,
      });
      throw new InternalServerErrorException(
        `Error getting user with email ${email}`,
      );
    }
  }

  async registerUser(registerDto: RegisterUserDto) {
    try {
      const existingUser = await this.findByEmail(registerDto.email);
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      if (!registerDto.name) {
        registerDto.name = registerDto.email.split('@')[0]; // Use email prefix as default name
      }

      const codeId = uuidv4();
      const hashedPassword = await hashPassword(registerDto.password);
      const user = await this.prisma.user.create({
        data: {
          ...registerDto,
          is_active: false,
          active_code: codeId,
          expired_code: new Date(Date.now() + 5 * 60 * 1000),
          password: hashedPassword,
        },
      } as any);

      await this.mailerService.sendMail({
        to: user.email,
        from: 'Hari',
        subject: 'Active your account at User Management!',
        template: 'register.hbs',
        context: {
          name: user?.name || user?.email,
          activationCode: codeId,
        },
      });
      return user;
    } catch (error) {
      this.logger.error('Error registering user:', {
        error: error.message,
        email: registerDto.email,
      });
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async handleActive(data: CodeAuthDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: Number(data.id),
          active_code: data.code,
        },
      });
      if (!user) {
        throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn!');
      }

      const isBeforeCheck = dayjs().isBefore(user.expired_code);
      if (!isBeforeCheck) {
        throw new BadRequestException('Mã code đã hết hạn!');
      }
      await this.prisma.user.update({
        where: { id: Number(data.id) },
        data: { is_active: true },
      });
      return data;
    } catch (error) {
      this.logger.error('Error activating user:', {
        error: error.message,
        userId: data.id,
      });
      throw new InternalServerErrorException('Error activating user');
    }
  }

  async handleRetryCode(data: RetryDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!user) {
        throw new BadRequestException('Không tồn tại người dùng có email này!');
      }
      const codeId = uuidv4();
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          active_code: codeId,
          expired_code: dayjs().add(5, 'minutes').toDate(),
        },
      });
      await this.mailerService.sendMail({
        to: user.email,
        from: 'Hari',
        subject: 'Active your account at User Management!',
        template: 'register.hbs',
        context: {
          name: user?.name || user?.email,
          activationCode: codeId,
        },
      });
      return {
        id: user.id,
      };
    } catch (error) {
      this.logger.error('Error retrying code:', {
        error: error.message,
        email: data.email,
      });
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrying code');
    }
  }
}
