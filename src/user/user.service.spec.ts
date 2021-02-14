import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const mockUserRepository = () => ({
  getAllUsers: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  findUsersByName: jest.fn(),
  findUserById: jest.fn()
});

describe('UserService', () => {
  let userService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository}
      ],
    }).compile();

    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('get all users from the repository', async () => {
      userRepository.getAllUsers.mockResolvedValue('someValue')
      expect(userRepository.getAllUsers).not.toHaveBeenCalled();

      const result = await userService.getAll();
      expect(userRepository.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual('someValue')
    })
  })

  describe('createUser', () => {
    it('create a new user', async () => {
      expect(userRepository.createUser).not.toHaveBeenCalled();

      const createUserDto = { firstName: 'joao', lastName: 'fulano', email: 'joao@email.com', password: '1234'}
      const result = await userService.create(createUserDto)
      expect(userRepository.createUser).toHaveBeenCalled();
    })
  })
});
