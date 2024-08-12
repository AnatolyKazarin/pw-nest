import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email', example: 'email@example.com' })
  @IsString({ message: 'Email should be a string value' })
  @IsEmail({}, { message: 'Wrong email form' })
  readonly email: string;

  @ApiProperty({ description: 'Password', example: 'password' })
  @IsString({ message: 'Password should be a string value' })
  @Length(4, 16, { message: 'Password should be from 4 to 16 letters long' })
  readonly password: string;

  @ApiProperty({ description: 'User Name', example: 'John Doe' })
  @IsString({ message: 'Username should be a string value' })
  readonly username: string;
}
