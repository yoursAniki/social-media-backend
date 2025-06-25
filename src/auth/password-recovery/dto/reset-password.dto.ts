import { IsEmail, IsNotEmpty } from 'class-validator'

export class ResetPasswordDto {
	@IsEmail({}, { message: 'Email is not valid' })
	@IsNotEmpty({ message: 'Email must not be empty' })
	email: string
}
