import { ListUserFilterDto } from "../dtos";
import { UserEntity } from "../entities";

export interface UserRepositoryInterface {
    save(user: UserEntity): Promise<UserEntity>;
    findById(userId: string): Promise<UserEntity>;
    list(listUsersParamsDto: ListUserFilterDto): Promise<UserEntity[]>
}