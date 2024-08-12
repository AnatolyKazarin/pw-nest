import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: User, example: '{ token: JWT }' })
  @ApiBody({
    schema: {
      description: 'Login body',
    },
    examples: {
      filter: {
        summary: 'Params',
        value: "{ email: 'test@email.com', password: 'password' }",
      },
    },
  })
  @Post('/login')
  login(@Body() body: Omit<CreateUserDto, 'username'>) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ status: 200, type: User, example: '{ token: JWT }' })
  @Post('/signup')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
