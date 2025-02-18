import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { UserRepositoryInterface } from "../interfaces";

/**
 * Use case for finding a user by ID.
 */
@Injectable()
export class FindUserUseCase {
  /**
   * Constructor for FindUserUseCase.
   * @param {UserRepositoryInterface} usersRepository - The user repository interface.
   */
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  /**
   * Executes the use case to find a user by ID.
   * @param {string} userId - The ID of the user to find.
   * @returns {Promise<UserEntity>} - The found user entity.
   */
  async execute(userId: string): Promise<UserEntity> {
    return await this.usersRepository.findById(userId);
  }
}
