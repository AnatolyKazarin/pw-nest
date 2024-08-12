import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Transaction amount', example: 50 })
  @IsInt({ message: 'The transaction amount must be a positive number' })
  amount: number;

  @ApiProperty({ description: 'Who will receive transaction', example: 4 })
  @IsInt({ message: 'Recipient id must be a number' })
  recipientId: number;
}
