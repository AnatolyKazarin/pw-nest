import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: Omit<CreateUserDto, 'username'>) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        `User with email ${dto.email} exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('Dto', dto);
    const hashedPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: await this.jwtService.signAsync(payload) };
  }

  private async validateUser(dto: Omit<CreateUserDto, 'username'>) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: `User with ${dto.email} not found`,
      });
    }
    const arePasswordsEquals = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (!arePasswordsEquals) {
      throw new UnauthorizedException({
        message: 'Password is invalid',
      });
    }
    return user;
  }
}
