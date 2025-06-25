import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class NewPasswordDto {
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@IsNotEmpty({ message: 'Password must not be empty' })
	password: string
}
