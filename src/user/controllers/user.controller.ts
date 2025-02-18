import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
  } from "@nestjs/common";
import { CreateUserDto } from "../application/dtos";
import { CreateUserUseCase } from "../application/use-cases";
  
  @Controller({
    version: "1",
    path: "users",
  })
  @Controller("users")
  export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}
  
    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<void> {
      await this.createUserUseCase.execute(createUserDto);
    }

    // @Public()
    // @HttpCode(HttpStatus.NO_CONTENT)
    // @Patch("/")
    // async update(@Body() createUserDto: CreateUserDto): Promise<void> {
    //   await this.usersService.create(createUserDto);
    // }
  
    // @Get("/:id")
    // @HttpCode(HttpStatus.OK)
    // @ApiBearerAuth()
    // async find(@Param("id") id: string) {
    //   return await this.usersService.findOne({ id });
    // }
  
    // @Get("/")//adicionar filtros por query parameters
    // @HttpCode(HttpStatus.OK)
    // @ApiBearerAuth()
    // async list() {
    //   return await this.usersService.findAll();
    // }
  }