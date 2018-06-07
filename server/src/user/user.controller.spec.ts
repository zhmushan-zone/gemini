import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { success, ResponseCode } from '../common/utils';
import { UserVO } from './vo/user.vo';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          keepConnectionAlive: true,
          entities: [User]
        }),
        TypeOrmModule.forFeature([User]),
        SharedModule
      ],
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    userService = module.get(UserService);
    userController = module.get(UserController);
  });

  const user: User = {
    id: 'id' as any,
    username: 'username',
    email: 'email',
    avatar: 'avatar',
    password: 'password',
    city: 'city',
    sex: 0,
    signature: 'signature',
    role: 0,
    salt: 'salt',
    token: 'token',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  describe('findAll', () => {
    it('success', async () => {
      jest.spyOn(userService, 'findAll').mockImplementation(() => [user]);
      expect(await userController.findAll())
        .toEqual(success([new UserVO(user)]));
    });
  });

  describe('register', () => {
    it('success', async () => {
      jest.spyOn(userService, 'register').mockImplementation(() => user);
      expect(await userController.register(user))
        .toEqual(success(new UserVO(user)));
    });
  });

  describe('login', () => {
    it('success', async () => {
      jest.spyOn(userService, 'login').mockImplementation(() => user);
      expect(await userController.login(user))
        .toEqual(success(new UserVO(user)));
    });
  });

  describe('has', () => {
    it('success', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(() => user);
      expect(await userController.has(user))
        .toEqual(success(true));
    });
  });

  describe('sendEmail', () => {
    it('err', async () => {
      expect(await userController.sendEmail('test'))
        .toEqual(expect.objectContaining({ code: ResponseCode.EMAIL_SEND_FAILED }));
    });
  });
});
