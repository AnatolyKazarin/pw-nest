import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [SequelizeModule.forFeature([Transaction]), UsersModule],
})
export class TransactionsModule {}
