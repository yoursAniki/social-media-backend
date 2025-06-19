import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const dev = 'development';

export const isDev = (configService: ConfigService) =>
  configService.getOrThrow('NODE_ENV') === dev;

export const IS_DEV_ENV = process.env.NODE_ENV === dev;
