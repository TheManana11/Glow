import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    if(!user) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to create user' })
    return res.status(HttpStatus.CREATED).json({
      message: 'User created successfully',
      payload: user
    });
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    if(!users) return{ message: 'No Users' }
    return {
      message: 'Users fetched successfully',
      payload: users
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if(!user) return{ message: `Failed to get user with is ${id}` }
    return {
      message: `User with id ${id} fetched successfully`,
      payload: user
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user =  await this.userService.update(id, updateUserDto);
    if(!user) return{ message: 'Failed to update user' }
    return {
      message: 'User updated successfully',
      payload: user
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    if(!user) return{ message: `Failed to remove user with id ${id}` }
    return {
      message: 'User deleted successfully',
    };
  }
}

