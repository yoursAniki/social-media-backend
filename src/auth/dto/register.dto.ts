import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordsMatchingConstraint } from 'src/libs/common/decorators/is-passwords-matching-constraint.decorator';

export class RegisterDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password: string;

  @IsString({ message: 'Password confirmation must be a string' })
  @MinLength(6, {
    message: 'Password confirmation must be at least 6 characters long',
  })
  @IsNotEmpty({ message: 'Password confirmation must not be empty' })
  @Validate(IsPasswordsMatchingConstraint, {
    message: 'Passwords do not match',
  })
  passwordRepeat: string;
}
