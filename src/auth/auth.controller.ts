import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: Omit<CreateUserDto, 'username'>) {
    return this.authService.login(body);
  }

  @Post('/signup')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
