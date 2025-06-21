import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthMethod, User } from 'prisma/generated';
import { Request } from 'express';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async register(dto: RegisterDto, req: Request) {
    const isExist = await this.userService.findByEmail(dto.email);

    if (isExist) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );

    return this.saveSession(newUser, req);
  }

  public async login() {}

  public async logout() {}

  private async saveSession(user: User, req: Request) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          console.error(err);
          return reject(
            new InternalServerErrorException('Failed to save session'),
          );
        }

        resolve({ user });
      });
    });
  }
}
