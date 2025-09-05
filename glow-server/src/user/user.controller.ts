import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateProfileDto } from "./dto/updateProfilePic.dto";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import type { Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "src/guard/auth.guard";

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

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    return await this.userService.findAll(res);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    return await this.userService.findOne(id, res);
    
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return await this.userService.update(id, updateUserDto, res);
  }

  @UseGuards(AuthGuard)
  @Patch("profile-pic/:id")
  async updateProfile(@Param("id") id: string, @Body() updateProfileDto: UpdateProfileDto, @Res() res: Response) {
    return await this.userService.updateProfilePic(id, updateProfileDto, res);
  }

  @UseGuards(AuthGuard)
  @Patch("password/:id")
  async updatePassword(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto, @Res() res: Response) {
    return await this.userService.updatePassword(id, updatePasswordDto, res);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    return await this.userService.remove(id, res);
  }
}
