import { Injectable, Global } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole, UserActivity } from './user.entity';
import { encrpty, generateSalt, ResponseCode } from '../common/utils';
import { MongoRepository } from 'typeorm';
import { GeminiError } from '../common/error';
import { ObjectId } from 'mongodb';

@Injectable()
@Global()
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

  search(keyword: string) {
    const regex = new RegExp(keyword, 'i');
    return this.userRepository.find({
      where: {
        $or: [
          { username: { $regex: regex } },
          { nickname: { $regex: regex } }
        ]
      }
    });
  }

  async addIntegral(userId: string, integral: number) {
    const user = await this.userRepository.findOne(userId);
    user.integral += integral;
    if (!(user.integral >= 0)) return new GeminiError(ResponseCode.INTEGRAL_NOT_ENOUGH);
    this.userRepository.update(userId, { integral: user.integral });
  }

  async updateActivities(userId: string, activity: UserActivity) {
    const user = await this.userRepository.findOne(userId);
    user.activities.unshift(activity);
    this.userRepository.update(userId, { activities: user.activities });
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ) {
  }
}

const captchaInfo = new Map<string, { email: string, captcha: string, ban: boolean }>();
