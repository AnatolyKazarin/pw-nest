import { IsInt } from 'class-validator';

export class CreateTransactionDto {
  @IsInt({ message: 'The transaction amount must be a positive number' })
  amount: number;

  @IsInt({ message: 'Recipient id must be a number' })
  recipientId: number;
}
