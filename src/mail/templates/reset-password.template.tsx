import { Body, Heading, Link, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface ResetPasswordTemplateProps {
	domain: string
	token: string
}

export function ResetPasswordTemplate({
	domain,
	token
}: ResetPasswordTemplateProps) {
	const resetLink = `${domain}/auth/new-password?token=${token}`

	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Восстановление пароля</Heading>
					<Text>
						Привет. Вы запросили восстановление пароля, чтобы
						создать новый пароль, перейдите по ссылке:
					</Text>
					<Link href={resetLink}>Восстановить пароль</Link>
					<Text>Эта ссылка действительна в течение 1 часа.</Text>
				</Body>
			</Html>
		</Tailwind>
	)
}
