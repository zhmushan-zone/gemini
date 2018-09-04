import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { encrpty, generateSalt, ResponseCode } from '../common/utils';
import { MongoRepository } from 'typeorm';
import { GeminiError } from '../common/error';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {

  delete(id: string) {
    this.userRepository.delete({ id: new ObjectId(id), role: UserRole.USER });
  }

  findById(id: string) {
    return this.userRepository.findOne(id);
  }

  findByIds(ids: ObjectId[]) {
    return this.userRepository.findByIds(ids);
  }

  save(user: User) {
    const obj = this.userRepository.create(user);
    return this.userRepository.save(obj);
  }

  findOne(user: User) {
    return this.userRepository.findOne(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  // find(user: User) {
  //   return this.userRepository.find(user);
  // }

  async updateById(id: string, user: User) {
    const doc = await this.findById(id);
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in user) doc[key] = user[key];
    return this.userRepository.save(doc);
  }

  register(user: User) {
    user.salt = generateSalt();
    user.password = encrpty(user.password, user.salt);
    user.jwtKey = generateSalt();
    return this.save(user);
  }

  async login(user: User) {
    const userFromDB = await this.userRepository.findOne({ username: user.username });
    if (userFromDB && encrpty(user.password, userFromDB.salt) === userFromDB.password) {
      return userFromDB;
    }

    return null;
  }

  refreshToken(user: User) {
    const jwtKey = generateSalt();
    this.userRepository.update(user.id.toHexString(), { jwtKey });
    return jwtKey;
  }

  getCaptchaInfo() {
    return captchaInfo;
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ) {
  }
}

const captchaInfo = new Map<string, { email: string, captcha: string, ban: boolean }>();
