import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateProfileDto } from "./dto/updateProfilePic.dto";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import type { Response } from "express";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { HelpersService } from "src/helpers/helpers.service";
import { ErrorService } from "src/helpers/errors.service";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly helperService: HelpersService,
    private readonly errorService: ErrorService
  ) {}

  // register
  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;

    const existing_user = await this.userRepository.findOneBy({ email });
    this.errorService.BadRequest("User already exists", existing_user);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const new_user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const user = await this.userRepository.save(new_user);

    const token = await this.jwtService.signAsync({ id: user.id, first_name: user.first_name, role: user.role });
    const { password, ...rest } = user;
    return {
      message: "User created successfully",
      payload: rest,
      token,
    };
  }

  // login
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    this.errorService.Unauthorized("User not found", !user);
    const match: boolean = await bcrypt.compare(
      loginDto.password,
      user?.password,
    );
    this.errorService.Unauthorized("Incorrect Password", !match);
    const token = await this.jwtService.signAsync({ id: user?.id, first_name: user?.first_name, role: user?.role });
    return {
      message: "User logged in successfully",
      payload: user,
      token,
    };
  }

  async findAll(res: Response) {
    const users = await this.userRepository.find();
    this.errorService.NotFound("No Users found in the database", !users);
    return {
      message: "Users fetched successfully",
      payload: users,
    };
  }

  async findOne(id: string, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    this.errorService.NotFound(`Failed to get user with is ${id}`, !user);
    return {
      message: `User with id ${id} fetched successfully`,
      payload: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto, res: Response) {
    await this.userRepository.update(id, updateUserDto);
    const updated_user = this.userRepository.findOneBy({ id });
    return {
      message: `User with id ${id} updated successfully`,
      payload: updated_user,
    };
  }


 async updateProfilePic(id: string, updateProfileDto: UpdateProfileDto, res: Response) {
  const base64String = updateProfileDto.image_url;

  const filename = await this.helperService.base64ToImage(base64String, "profiles");
  this.errorService.BadRequest("Invalid image or unsupported image type, only accepts png, jpeg, jpg, webp", !filename);

  const filePathForDb = `uploads/profiles/${filename}`;
  await this.userRepository.update(id, { image_url: filePathForDb });

  const updated_user = await this.userRepository.findOneBy({ id });

  return {
    message: `User with id ${id} updated successfully`,
    payload: updated_user,
  };
}


  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    const match: boolean = await bcrypt.compare(updatePasswordDto.oldPassword, user?.password)
    this.errorService.BadRequest('Old password is incorrect', !match);

    this.errorService.BadRequest('Please make sure to confirm password right', updatePasswordDto.newPassword !== updatePasswordDto.confirmPassword);
    
    const hashed_password = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    await this.userRepository.update(id, { password: hashed_password });
    return {
      message: `Password updated successfully`,
      payload: user,
    };
  }

  async remove(id: string, res: Response) {
    const deleted_user = await this.userRepository.delete({ id });
    return {
      message: `User with id ${id} deleted successfully`,
      payload: deleted_user,
    };
  }
}
