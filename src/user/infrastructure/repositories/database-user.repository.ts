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

  async save(userEntity: UserEntity): Promise<UserEntity> {
    const storedUser = await this.usersRepository.save(userEntity);

    return plainToClass(UserEntity, storedUser);
  }

  async findById(userId: string): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOneBy({ id: userId });

    if(!foundUser)
      throw new NotFoundException("User id not found");

    return plainToClass(UserEntity, foundUser);
  }

  async list(listUsersParamsDto: ListUserFilterDto): Promise<UserEntity[]> {
    const foundUsers: UserModel[] = await this.usersRepository.find({
      where: listUsersParamsDto
    })

    return foundUsers?.map((foundUser) => plainToClass(UserEntity, foundUser));
  }
}
