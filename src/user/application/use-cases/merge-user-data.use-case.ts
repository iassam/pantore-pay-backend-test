import { Injectable } from "@nestjs/common";
import { encPassword, removeNullAttributes } from "../../shared/helpers";
import { UserEntity } from "../entities";

/**
 * Use case for merging user data.
 */
@Injectable()
export class MergeUserDataUseCase {
  constructor() {}

  /**
   * Executes the use case to merge stored user data with updated user data.
   * @param {UserEntity} storedUserData - The stored user data.
   * @param {Partial<UserEntity>} updatedUserData - The updated user data.
   * @returns {Promise<UserEntity>} - The merged user entity.
   */
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
