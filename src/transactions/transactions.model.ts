import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  senderId: number;

  @Column({
    type: DataType.INTEGER,
  })
  recipientId: number;

  @Column({
    type: DataType.INTEGER,
  })
  amount: number;

  @Column({
    type: DataType.INTEGER,
  })
  balance: number;

  @Column({
    type: DataType.STRING,
  })
  senderName: string;

  @Column({
    type: DataType.STRING,
  })
  recipientName: string;
}
