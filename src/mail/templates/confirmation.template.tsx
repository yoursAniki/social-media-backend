import * as React from 'react'
import { Body, Heading, Link, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'

interface ConfirmationTemplateProps {
	domain: string
	token: string
}

export function ConfirmationTemplate({
	domain,
	token
}: ConfirmationTemplateProps) {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`

	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Подтверждение почты</Heading>
					<Text>
						Привет! Для подтверждения почты перейдите по ссылке:
					</Text>
					<Link href={confirmLink}>Подтвердить почту</Link>
					<Text>Эта ссылка действительна в течение 1 часа.</Text>
				</Body>
			</Html>
		</Tailwind>
	)
}
