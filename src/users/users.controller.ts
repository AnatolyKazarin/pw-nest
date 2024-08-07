import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserId } from '../decorators/user-id.decorator';
import { User } from './users.model';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  getUser(@UserId() userId: number): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() { filter }: { filter: string }) {
    return this.usersService.getUsersByFilter(filter);
  }
}
