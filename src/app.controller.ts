import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): { message: string; version: string; status: string } {
    return {
      message: this.appService.getHello(),
      version: '1.0.0',
      status: 'running',
    };
  }

  @Get('health')
  @Public()
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
