import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Movie Booking System API!';
  }

  getVersion(): string {
    return '1.0.0';
  }

  getStatus(): { status: string; uptime: number } {
    return {
      status: 'running',
      uptime: process.uptime(),
    };
  }
}
