import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email should be a string value' })
  @IsEmail({}, { message: 'Wrong email form' })
  readonly email: string;

  @IsString({ message: 'Password should be a string value' })
  @Length(4, 16, { message: 'Password should be from 4 to 16 letters long' })
  readonly password: string;

  @IsString({ message: 'Username should be a string value' })
  readonly username: string;
}
