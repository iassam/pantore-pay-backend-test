import { Inject, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../dtos";
import { UserRepositoryInterface } from "../interfaces";
import { MergeUserDataUseCase } from "./merge-user-data.use-case";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
    private readonly mergeUserDataUseCase: MergeUserDataUseCase 
  ) {}

  async execute(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
    const storedUser = await this.usersRepository.findById(userId);
    let currentUserData = await this.mergeUserDataUseCase.execute(storedUser, updateUserDto);

    await this.usersRepository.save(currentUserData);
  }
}
