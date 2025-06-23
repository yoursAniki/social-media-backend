import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { isDev } from 'src/libs/common/utils/is-dev.util';

export const getMailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    logger: true,
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: configService.getOrThrow<number>('MAIL_PORT'),
    secure: !isDev(configService),
    auth: {
      user: configService.getOrThrow<string>('MAIL_LOGIN'),
      pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `"Social Media" ${configService.getOrThrow<string>('MAIL_LOGIN')}`,
  },
});
