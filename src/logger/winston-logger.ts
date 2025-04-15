import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as path from 'path';
import * as fs from 'fs';

const logDir = path.join(__dirname, '..', 'logs');

// Create directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const winstonLoggerConfig: winston.LoggerOptions = {
  //   level: 'info',
  //   format: winston.format.combine(
  //     winston.format.timestamp(),
  //     winston.format.errors({ stack: true }),
  //     winston.format.splat(),
  //     winston.format.json(),
  //   ),
  defaultMeta: { service: 'movie-booking' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('MovieBookingApp', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    // Commented out the regular app.log file transport
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info',
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'errors.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'rejections.log'),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
};
