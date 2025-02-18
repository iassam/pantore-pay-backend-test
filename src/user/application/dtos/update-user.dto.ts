import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "../../shared/enums";

export class UpdateUserDto {
    
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "Email",
    example: "test@email.com",
    required: false,
  })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Password",
    example: "password",
    required: false,
  })
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Name of user",
    example: "John",
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Role of user",
    enum: UserRole,
    example: UserRole.CLIENT,
    required: false,
  })
  role?: UserRole;
}
