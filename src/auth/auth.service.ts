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

  async login(dto: CreateUserDto) {
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
    const hashedPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const arePasswordsEquals = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (user && arePasswordsEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'User not found' });
  }
}
