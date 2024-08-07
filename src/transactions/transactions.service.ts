import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction } from './transactions.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
    private readonly usersService: UsersService,
  ) {}

  async getTransactions(id: number): Promise<Transaction[]> {
    console.log('id', id);
    return await this.transactionRepository.findAll({
      where: { senderId: id },
    });
  }

  async createTransaction(
    dto: CreateTransactionDto,
    userId: number,
  ): Promise<Transaction> {
    const { recipientId, amount } = dto;
    const sender: User | null = await this.usersService.getUserById(userId);
    const recipient: User | null =
      await this.usersService.getUserById(recipientId);

    if (!recipient || !sender) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (sender.balance < amount) {
      throw new HttpException(
        { message: 'Not enough balance' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersService.updateUserBalance(sender, sender.balance - amount);
    await this.usersService.updateUserBalance(
      recipient,
      recipient.balance + amount,
    );

    const transaction = {
      senderId: sender.id,
      recipientId: recipient.id,
      amount,
      balance: sender.balance,
      senderName: sender.username,
      recipientName: recipient.username,
    };

    return await this.transactionRepository.create(transaction);
  }
}
