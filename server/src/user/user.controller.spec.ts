import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Sex, UserRole } from './user.entity';
import { success, ResponseCode } from '../common/utils';
import { UserVO } from './vo/user.vo';
import { config } from '../config';
import { AuthService } from '../common/auth/auth.service';
import { JwtStrategy } from '../common/auth/jwt.strategy';

const user: User = {
  id: 'id',
  username: 'username',
  nickname: 'nickname',
  email: 'email',
  avatar: 'avatar',
  password: 'password',
  job: 'job',
  city: 'city',
  sex: Sex.FEMALE,
  signature: 'signature',
  role: UserRole.USER,
  salt: 'salt',
  jwtKey: 'jwtKey',
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          keepConnectionAlive: true,
          entities: [User],
          ...config.typeorm
        }),
        TypeOrmModule.forFeature([User])
      ],
      controllers: [UserController],
      providers: [
        UserService,
        JwtStrategy,
        AuthService
      ]
    }).compile();

    userService = module.get(UserService);
    authService = module.get(AuthService);
    userController = module.get(UserController);
  });

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
      jest.spyOn(authService, 'generateToken').mockImplementation(() => 'token');
      jest.spyOn(userService, 'getCaptchaInfo').mockImplementation(() => {
        const map = new Map<string, { email: string, captcha: string, ban: boolean }>();
        map.set('127.0.0.1', { email: 'email', captcha: 'captcha', ban: true });
        return map;
      });
      expect(await userController.register(user, 'captcha'))
        .toEqual(success(new UserVO(user, 'token')));
    });
  });

  describe('validateEmail', () => {
    it('success', async () => {
      jest.spyOn(userService, 'getCaptchaInfo').mockImplementation(() => {
        const map = new Map<string, { email: string, captcha: string, ban: boolean }>();
        map.set('127.0.0.1', { email: 'email', captcha: 'captcha', ban: true });
        return map;
      });
      expect(await userController.validateEmail('email', 'captcha'))
        .toEqual(success());
    });
  });

  describe('login', () => {
    it('success', async () => {
      jest.spyOn(userService, 'login').mockImplementation(() => user);
      jest.spyOn(authService, 'generateToken').mockImplementation(() => 'token');
      expect(await userController.login(user))
        .toEqual(success(new UserVO(user, 'token')));
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

  describe('auth', () => {
    it('success', async () => {
      jest.spyOn(authService, 'generateToken').mockImplementation(() => 'token');
      expect(await userController.auth(user))
        .toEqual(success(
          new UserVO(
            user,
            authService.generateToken(
              user.username,
              userService.refreshToken(user)
            )
          )
        ));
    });
  });

  describe('updateOne', () => {
    it('success', async () => {
      jest.spyOn(userService, 'updateById').mockImplementation(() => user);
      jest.spyOn(authService, 'generateToken').mockImplementation(() => 'token');
      expect(await userController.updateOne(user, user))
        .toEqual(success());
    });
  });
});
