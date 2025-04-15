import { Provider } from '@nestjs/common';
import * as winston from 'winston';
import { winstonLoggerConfig } from './winston-logger';

export const WinstonLoggerProvider: Provider = {
  provide: 'WinstonLogger',
  useFactory: () => {
    const logger = winston.createLogger(winstonLoggerConfig);

    // Add console transport in development
    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }

    return logger;
  },
};
