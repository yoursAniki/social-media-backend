import { Module } from '@nestjs/common'
import { PasswordRecoveryService } from './password-recovery.service'
import { PasswordRecoveryController } from './password-recovery.controller'
import { UserService } from 'src/user/user.service'
import { MailService } from 'src/mail/mail.service'

@Module({
	controllers: [PasswordRecoveryController],
	providers: [PasswordRecoveryService, UserService, MailService]
})
export class PasswordRecoveryModule {}
