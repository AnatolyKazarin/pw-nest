import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtGuard } from '../auth/jwt.guard';
import { Transaction } from './transactions.model';
import { UserId } from '../decorators/user-id.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('api/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseGuards(JwtGuard)
  public async getTransactions() {
    return this.transactionsService.getTransactions();
  }

  @Post()
  @UseGuards(JwtGuard)
  public async createTransaction(
    @Body() dto: CreateTransactionDto,
    @UserId() userId: number,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(dto, userId);
  }
}
