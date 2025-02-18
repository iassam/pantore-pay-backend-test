import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { UserRepositoryInterface } from "../interfaces";
import { ListUsersParamsDto } from "../dtos";

/**
 * Use case for listing users based on parameters.
 */
@Injectable()
export class ListUserUseCase {
  /**
   * Constructor for ListUserUseCase.
   * @param {UserRepositoryInterface} usersRepository - The user repository interface.
   */
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  /**
   * Executes the use case to list users based on parameters.
   * @param {ListUsersParamsDto} listUsersParamsDto - List of parameters.
   * @returns {Promise<UserEntity[]>} - Array of user entities.
   */
  async execute(listUsersParamsDto: ListUsersParamsDto): Promise<UserEntity[]> {
    return await this.usersRepository.list(listUsersParamsDto);
  }
}
