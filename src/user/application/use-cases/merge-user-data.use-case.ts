import { Injectable } from "@nestjs/common";
import { encPassword, removeNullAttributes } from "../../shared/helpers";
import { UserEntity } from "../entities";

@Injectable()
export class MergeUserDataUseCase {
  constructor() {}

  async execute(
    storedUserData: UserEntity,
    updatedUserData: Partial<UserEntity>
): Promise<UserEntity> {
    let currentUserData = {
      ...storedUserData,
      ...removeNullAttributes(updatedUserData)
    };    
    
    if (updatedUserData?.password)
      currentUserData.password = await encPassword(updatedUserData.password);
      
    return currentUserData;
  }
}
