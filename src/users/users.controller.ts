import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserId } from '../decorators/user-id.decorator';
import { User } from './users.model';
import { JwtGuard } from '../auth/jwt.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  @UseGuards(JwtGuard)
  getUser(@UserId() userId: number): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @ApiOperation({ summary: 'Get filtered users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBody({
    schema: {
      type: 'string',
      enum: ['filter'],
      description: 'Search string',
    },
    examples: {
      filter: {
        summary: 'Params',
        value: '{ filter: string }',
      },
    },
  })
  @Post()
  @UseGuards(JwtGuard)
  create(@Body() { filter }: { filter: string }) {
    return this.usersService.getUsersByFilter(filter);
  }
}
