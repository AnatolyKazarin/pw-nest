import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findByPk(id);
  }

  async updateUserBalance(user: User, balance: number) {
    user.balance = balance;
    await user.save();
  }

  async getUsersByFilter(filter: string): Promise<User[]> {
    return await this.userRepository.findAll({
      where: { username: { [Op.regexp]: filter } },
    });
  }
}
