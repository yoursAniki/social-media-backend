import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    PrismaModule,
    MailModule,
    EmailConfirmationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
