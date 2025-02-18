import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../../../../src/user/application/use-cases/create-user.use-case';
import { UserRepositoryInterface } from '../../../../src/user/application/interfaces';
import { CreateUserDto } from '../../../../src/user/application/dtos';
import { UserEntity } from '../../../../src/user/application/entities';
import { encPassword } from '../../../../src/user/shared/helpers';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../../src/user/shared/enums';

jest.mock('../../../../src/user/shared/helpers', () => ({
  encPassword: jest.fn(),
}));

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'UserRepositoryInterface',
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepositoryInterface>('UserRepositoryInterface');
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      name: faker.string.sample(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.enumValue(UserRole)
    };

    const encryptedPassword = faker.internet.password();
    (encPassword as jest.Mock).mockResolvedValue(encryptedPassword);

    const user: UserEntity = {
      ...createUserDto,
      password: encryptedPassword,
    };

    (userRepository.save as jest.Mock).mockResolvedValue(user);

    const result = await useCase.execute(createUserDto);

    expect(encPassword).toHaveBeenCalledWith(createUserDto.password);
    expect(userRepository.save).toHaveBeenCalledWith({
      ...createUserDto,
      password: encryptedPassword,
    });
    expect(result).toEqual(user);
  });
});
