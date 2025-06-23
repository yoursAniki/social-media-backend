import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UserService } from 'src/user/user.service'
import { AuthMethod, User } from 'prisma/generated'
import { Request, Response } from 'express'
import { LoginDto } from './dto/login.dto'
import { verify } from 'argon2'
import { ConfigService } from '@nestjs/config'
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service'

@Injectable()
export class AuthService {
	public constructor(
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly emailConfirmationService: EmailConfirmationService
	) {}

	public async register(dto: RegisterDto) {
		const isExist = await this.userService.findByEmail(dto.email)

		if (isExist) {
			throw new ConflictException('User already exists')
		}

		const newUser = await this.userService.create(
			dto.email,
			dto.password,
			dto.name,
			'',
			AuthMethod.CREDENTIALS,
			false
		)

		await this.emailConfirmationService.sendVerificationToken(newUser)

		return {
			message: 'You have successfully registered. Confirm your email.'
		}
	}

	public async login(dto: LoginDto, req: Request) {
		const user = await this.userService.findByEmail(dto.email)

		if (!user || !user.password) {
			throw new NotFoundException('User not found')
		}

		const isPasswordValid = await verify(user.password, dto.password)

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid login or password')
		}

		if (!user.isVerified) {
			await this.emailConfirmationService.sendVerificationToken(user)
			throw new UnauthorizedException(
				'User is not verified. Please check your email and confirm your account.'
			)
		}

		return this.saveSession(user, req)
	}

	public async logout(res: Response, req: Request): Promise<void> {
		return new Promise((resolve, reject) => {
			req.session.destroy(err => {
				if (err) {
					return reject(
						new InternalServerErrorException('Failed to logout')
					)
				}

				res.clearCookie(
					this.configService.getOrThrow<string>('SESSION_NAME')
				)
				resolve()
			})
		})
	}

	public async saveSession(user: User, req: Request) {
		return new Promise((resolve, reject) => {
			req.session.userId = user.id

			req.session.save(err => {
				if (err) {
					console.error(err)
					return reject(
						new InternalServerErrorException(
							'Failed to save session'
						)
					)
				}

				resolve({ user })
			})
		})
	}
}
