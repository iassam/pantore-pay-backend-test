import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Param,
    Get,
    Query,
    Patch,
  } from "@nestjs/common";
import { CreateUserDto, ListUsersParamsDto, UpdateUserDto } from "../application/dtos";
import { ApiResponse } from "@nestjs/swagger";
import { UserEntity } from "../application/entities";
import { 
  CreateUserUseCase,
  FindUserUseCase,
  ListUserUseCase,
  UpdateUserUseCase 
} from "../application/use-cases";
  
  @Controller({
    version: "1",
    path: "users",
  })
  @Controller("users")
  export class UserController {
    constructor(
      private readonly createUserUseCase: CreateUserUseCase,
      private readonly findUserUseCase:FindUserUseCase,
      private readonly listUserUseCase:ListUserUseCase,
      private readonly updateUserUseCase:UpdateUserUseCase
    ) {}
  
    /**
     * Creates a new user.
     * @param createUserDto - User creation details.
     */
    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<void> {
      await this.createUserUseCase.execute(createUserDto);
    }

    /**
     * Updates an existing user.
     * @param userId - ID of the user to update.
     * @param updateUserDto - User update details.
     */
    @HttpCode(HttpStatus.NO_CONTENT)
    @Patch("/:id")
    async update(
      @Param('id') userId: string, 
      @Body() updateUserDto: UpdateUserDto
    ): Promise<void> {
      await this.updateUserUseCase.execute(userId, updateUserDto);
    }
  
    /**
     * Finds a user by ID.
     * @param userId - ID of the user to find.
     * @returns The found user entity.
     */
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Found user record",
    })
    async find(@Param("id") userId: string): Promise<UserEntity> {
      return await this.findUserUseCase.execute(userId);
    }
  
    /**
     * Lists users based on query parameters.
     * @param listUsersParamsDto - Object containing list query parameters.
     * @returns A list of user entities.
     */
    @Get("/")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Found users records",
    })
    async list(@Query() listUsersParamsDto:ListUsersParamsDto) {
      return await this.listUserUseCase.execute(listUsersParamsDto);
    }
  }