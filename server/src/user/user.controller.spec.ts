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
        AuthService,
        JwtStrategy
      ]
    }).compile();

    userService = module.get(UserService);
    authService = module.get(AuthService);
    userController = module.get(UserController);
  });

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
    videos: [],
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
      jest.spyOn(authService, 'generateToken').mockImplementation(() => 'token');
      expect(await userController.register(user))
        .toEqual(success(new UserVO(user, 'token')));
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
});
