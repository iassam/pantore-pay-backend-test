import { IsEnum, IsString } from "class-validator";
import { UserRole } from "../../shared/enums";

export class ListUserFilterDto {
  @IsString()
  email?: string;

  @IsString()
  name?: string;

  @IsEnum({enum: UserRole})
  role?: UserRole;
}
