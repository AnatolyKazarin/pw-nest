import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface TransactionCreationAttribute {
  senderId: number;
  recipientId: number;
  amount: number;
  balance: number;
  senderName: string;
  recipientName: string;
}

@Table({ tableName: 'transactions' })
export class Transaction extends Model<
  Transaction,
  TransactionCreationAttribute
> {
  @ApiProperty({
    description: 'Transaction id',
    example: 3,
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'Sender id',
    example: 4,
  })
  @Column({
    type: DataType.INTEGER,
  })
  senderId: number;

  @ApiProperty({
    description: 'Recipient id',
    example: 6,
  })
  @Column({
    type: DataType.INTEGER,
  })
  recipientId: number;

  @ApiProperty({
    description: 'Transaction amount',
    example: 50,
  })
  @Column({
    type: DataType.INTEGER,
  })
  amount: number;

  @ApiProperty({
    description: 'Sender balance',
    example: 300,
  })
  @Column({
    type: DataType.INTEGER,
  })
  balance: number;

  @ApiProperty({
    description: 'Sender name',
    example: 'John Doe',
  })
  @Column({
    type: DataType.STRING,
  })
  senderName: string;

  @ApiProperty({
    description: 'Recipient name',
    example: 'Samantha Fox',
  })
  @Column({
    type: DataType.STRING,
  })
  recipientName: string;
}
