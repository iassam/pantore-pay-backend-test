import { Inject, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../dtos";
import { UserRepositoryInterface } from "../interfaces";
import { MergeUserDataUseCase } from "./merge-user-data.use-case";

/**
 * Use case for updating a user.
 */
@Injectable()
export class UpdateUserUseCase {
  /**
   * Constructor for UpdateUserUseCase.
   * @param {UserRepositoryInterface} usersRepository - The user repository interface.
   * @param {MergeUserDataUseCase} mergeUserDataUseCase - The use case for merging user data.
   */
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
    private readonly mergeUserDataUseCase: MergeUserDataUseCase 
  ) {}

  /**
   * Executes the use case to update a user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - The data transfer object containing user update details.
   * @returns {Promise<void>} - Resolve if has not errors.
   */
  async execute(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
    const storedUser = await this.usersRepository.findById(userId);
    let currentUserData = await this.mergeUserDataUseCase.execute(storedUser, updateUserDto);

    await this.usersRepository.save(currentUserData);
  }
}
