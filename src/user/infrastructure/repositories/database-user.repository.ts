import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { UserModel } from "../models";
import { UserRepositoryInterface } from "../../application/interfaces";
import { UserEntity } from "../../application/entities";
import { ListUserFilterDto } from "../../application/dtos";

@Injectable()
export class DatabaseUserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}

  /**
   * Saves a user entity to the database.
   * @param userEntity - The user entity to save.
   * @returns The saved user entity.
   */
  async save(userEntity: UserEntity): Promise<UserEntity> {
    const storedUser = await this.usersRepository.save(userEntity);

    return plainToClass(UserEntity, storedUser);
  }

  /**
   * Finds a user by ID.
   * @param userId - The ID of the user to find.
   * @returns The found user entity.
   * @throws NotFoundException if the user is not found.
   */
  async findById(userId: string): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOneBy({ id: userId });

    if(!foundUser)
      throw new NotFoundException("User id not found");

    return plainToClass(UserEntity, foundUser);
  }

  /**
   * Lists users based on filter parameters.
   * @param listUsersParamsDto - The filter parameters for listing users.
   * @returns A list of user entities.
   */
  async list(listUsersParamsDto: ListUserFilterDto): Promise<UserEntity[]> {
    const foundUsers: UserModel[] = await this.usersRepository.find({
      where: listUsersParamsDto
    })

    return foundUsers?.map((foundUser) => plainToClass(UserEntity, foundUser));
  }
}
