import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public, ResponseMessage } from '../decorator/customize';
import { RegisterUserDto } from './dto/register.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CodeAuthDto, RetryDto } from './dto/code.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login successful')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ResponseMessage('Get user profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  @ResponseMessage('User registered successfully')
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @Public()
  @Post('check-code')
  @ResponseMessage('Code verification successful')
  checkCode(@Body() codeAuthDto: CodeAuthDto) {
    return this.authService.checkCode(codeAuthDto);
  }

  @Public()
  @Post('retry-active')
  @ResponseMessage('Activation code resent')
  retryActive(@Body() retryDto: RetryDto) {
    return this.authService.retryCode(retryDto);
  }

  @Public()
  @Get('mail')
  @ResponseMessage('Test email sent')
  async testMail() {
    try {
      const mail = await this.mailerService.sendMail({
        to: 'thanhhaihuit2k3@gmail.com', // list of receivers
        from: 'Hari', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome 1', // plaintext body
        template: 'register.hbs',
        context: {
          name: 'Thanh Hải',
          activationCode: 135151351,
        },
      });
      return mail;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
