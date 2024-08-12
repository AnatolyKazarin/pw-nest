import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtGuard } from '../auth/jwt.guard';
import { Transaction } from './transactions.model';
import { UserId } from '../decorators/user-id.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';

@ApiTags('Transactions')
@Controller('api/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: "Get User's Transactions" })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Get()
  @UseGuards(JwtGuard)
  public async getTransactions(@UserId() userId: number) {
    return this.transactionsService.getTransactions(userId);
  }

  @ApiOperation({ summary: 'Create Transactions' })
  @ApiResponse({ status: 200, type: Transaction })
  @Post()
  @UseGuards(JwtGuard)
  public async createTransaction(
    @Body() dto: CreateTransactionDto,
    @UserId() userId: number,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(dto, userId);
  }
}
