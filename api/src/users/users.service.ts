import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findOne(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
}
