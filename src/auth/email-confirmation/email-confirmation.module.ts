import { forwardRef, Module } from '@nestjs/common'
import { EmailConfirmationService } from './email-confirmation.service'
import { EmailConfirmationController } from './email-confirmation.controller'
import { MailModule } from 'src/mail/mail.module'
import { AuthModule } from '../auth.module'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { MailService } from 'src/mail/mail.service'

@Module({
	imports: [MailModule, UserModule, forwardRef(() => AuthModule)],
	controllers: [EmailConfirmationController],
	providers: [EmailConfirmationService, UserService, MailService],
	exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
