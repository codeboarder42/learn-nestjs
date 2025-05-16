import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(userName: string): Promise<User> {
    const user = {
      id: 1,
      username: userName,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      isActive: true,
      photos: [],
    };
    return Promise.resolve(user);
  }
}
