import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
  @InjectRepository(User)
  private userRepository: Repository<User>,
) {}


  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;

    const existing_user = await this.userRepository.findOneBy({ email });
    if(existing_user) return null;

    const new_user = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(new_user);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string) {
    const users = await this.userRepository.findOneBy({ id });
    if(!users) return null;
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updated_user = this.userRepository.findOneBy({ id });
    return updated_user;
  }

  async remove(id: string) {
    const deleted_user = await this.userRepository.delete({ id });
    return deleted_user; 
  }
}

