import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { CreateUserDto } from "../dtos";
import { UserRepositoryInterface } from "../interfaces";
import { encPassword } from "../../shared/helpers";

/**
 * Use case for creating a new user.
 */
@Injectable()
export class CreateUserUseCase {
  /**
   * Constructor for CreateUserUseCase.
   * @param {UserRepositoryInterface} usersRepository - The user repository interface.
   */
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  /**
   * Executes the use case to create a new user.
   * @param {CreateUserDto} createUserDto - User data.
   * @returns {Promise<UserEntity>} - Created user entity.
   */
  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.save({
      ...createUserDto, 
      password: await encPassword(createUserDto.password)
    });
  }
}
