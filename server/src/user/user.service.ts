import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { encrpty, generateSalt } from '../common/utils';
import { Repository, MongoRepository } from 'typeorm';

@Injectable()
export class UserService {

  findOne(user: User) {
    return this.userRepository.findOne(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  find(user: User) {
    return this.userRepository.find(user);
  }

  updateById(id: string, user: User) {
    return this.userRepository.update({ id }, user);
  }

  register(user: User) {
    user.salt = generateSalt();
    user.password = encrpty(user.password, user.salt);
    user.jwtKey = generateSalt();
    return this.userRepository.save(user);
  }

  async login(user: User) {
    const userFromDB = await this.userRepository.findOne({ username: user.username });
    if (encrpty(user.password, userFromDB.salt) === userFromDB.password) {
      return userFromDB;
    }
  }

  refreshToken(user: User) {
    const jwtKey = generateSalt();
    this.updateById(user.id, { jwtKey } as User);
    return jwtKey;
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ) { }
}
