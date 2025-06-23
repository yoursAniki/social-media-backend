import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserService } from 'src/user/user.service'
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module'
import { MailService } from 'src/mail/mail.service'

@Module({
	imports: [forwardRef(() => EmailConfirmationModule)],
	controllers: [AuthController],
	providers: [AuthService, UserService, MailService],
	exports: [AuthService]
})
export class AuthModule {}
