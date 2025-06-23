import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { comparePassword } from 'src/helpers/bcrypt-password';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/auth/dto/register.dto';
import { CodeAuthDto, RetryDto } from 'src/auth/dto/code.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(username);
      if (!user) {
        throw new UnauthorizedException('Email not found');
      }
      if (!(await comparePassword(password, user.password))) {
        throw new UnauthorizedException('Password not match');
      }
      const payload = { email: user.email, id: user.id, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async registerUser(registerDto: RegisterUserDto) {
    return this.usersService.registerUser(registerDto);
  }

  checkCode(data: CodeAuthDto) {
    return this.usersService.handleActive(data);
  }

  retryCode(data: RetryDto) {
    return this.usersService.handleRetryCode(data);
  }
}
