import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // register
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return await this.userService.create(createUserDto, res);
  }

  // login
  @Post('login')
  async signIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    return await this.userService.login(loginDto, res);
  }

  @Get()
  async findAll(@Res() res: Response) {
    return await this.userService.findAll(res);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    return await this.userService.findOne(id, res);
    
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return await this.userService.update(id, updateUserDto, res);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    return await this.userService.remove(id, res);
  }
}
